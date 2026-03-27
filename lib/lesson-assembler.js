import { supabase } from './supabase';
import { generateExercise } from './exercise-generator';
import { calculateNextReview } from './spaced-repetition';
import { explainMistake } from './gemini';

export async function buildDailyLesson(userId) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  const today = new Date().toISOString().split('T')[0];
  
  const { data: dueReviews } = await supabase
    .from('user_progress')
    .select('*, words(*)')
    .eq('user_id', userId)
    .lte('next_review', today)
    .order('leitner_box', { ascending: true })
    .limit(profile?.daily_review_words || 30);
  
  const { data: existingProgress } = await supabase
    .from('user_progress')
    .select('word_id')
    .eq('user_id', userId);
  
  const learnedIds = existingProgress?.map(p => p.word_id) || [];
  
  const { data: newWords } = await supabase
    .from('words')
    .select('*')
    .eq('hsk_level', profile?.target_hsk || 1)
    .not('id', 'in', learnedIds.length > 0 ? learnedIds : ['00000000-0000-0000-0000-000000000000'])
    .limit(profile?.daily_new_words || 15);
  
  const { data: allWords } = await supabase
    .from('words')
    .select('*')
    .eq('hsk_level', profile?.target_hsk || 1);
  
  const exercises = [];
  
  for (const item of dueReviews || []) {
    exercises.push({
      ...generateExercise(item.words, item, allWords, 'auto'),
      isReview: true,
      progressId: item.id,
      leitnerBox: item.leitner_box
    });
  }
  
  for (const word of newWords || []) {
    exercises.push({
      ...generateExercise(word, null, allWords, 'multipleChoice'),
      isReview: false,
      wordId: word.id
    });
  }
  
  return exercises.sort(() => 0.5 - Math.random());
}

export async function processAnswer(userId, exercise, userAnswer, timeSpent) {
  const isCorrect = userAnswer === exercise.correctAnswer;
  
  let progress;
  if (exercise.isReview) {
    const { data } = await supabase
      .from('user_progress')
      .select('*')
      .eq('id', exercise.progressId)
      .single();
    progress = data;
  }
  
  const currentBox = progress?.leitner_box || 1;
  const reviewUpdate = calculateNextReview(currentBox, isCorrect);
  
  if (progress) {
    await supabase
      .from('user_progress')
      .update({
        leitner_box: reviewUpdate.newBox,
        next_review: reviewUpdate.nextDate.toISOString().split('T')[0],
        review_count: (progress.review_count || 0) + 1,
        correct_count: isCorrect ? (progress.correct_count || 0) + 1 : (progress.correct_count || 0),
        incorrect_count: !isCorrect ? (progress.incorrect_count || 0) + 1 : (progress.incorrect_count || 0),
        last_reviewed_date: new Date().toISOString(),
        is_learned: reviewUpdate.newBox === 6
      })
      .eq('id', progress.id);
  } else {
    await supabase
      .from('user_progress')
      .insert({
        user_id: userId,
        word_id: exercise.wordId,
        leitner_box: reviewUpdate.newBox,
        next_review: reviewUpdate.nextDate.toISOString().split('T')[0],
        review_count: 1,
        correct_count: isCorrect ? 1 : 0,
        incorrect_count: isCorrect ? 0 : 1,
        first_seen_date: new Date().toISOString(),
        last_reviewed_date: new Date().toISOString()
      });
  }
  
  let explanation = null;
  if (!isCorrect) {
    const { data: word } = await supabase
      .from('words')
      .select('*')
      .eq('id', exercise.wordId)
      .single();
    explanation = await explainMistake(word, userAnswer, 'meaning_confusion');
  }
  
  return {
    correct: isCorrect,
    explanation,
    nextReviewDays: reviewUpdate.daysUntil,
    newBox: reviewUpdate.newBox
  };
}

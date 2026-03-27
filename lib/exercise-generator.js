export function generateExercise(word, progress, allWords, exerciseType = 'auto') {
  if (exerciseType === 'auto') {
    const box = progress?.leitner_box || 1;
    if (box <= 2) exerciseType = 'multipleChoice';
    else if (box <= 4) exerciseType = 'fillBlank';
    else exerciseType = 'typeAnswer';
  }

  switch (exerciseType) {
    case 'multipleChoice':
      return generateMultipleChoice(word, allWords);
    case 'fillBlank':
      return generateFillBlank(word);
    case 'typeAnswer':
      return generateTypeAnswer(word);
    default:
      return generateMultipleChoice(word, allWords);
  }
}

function generateMultipleChoice(word, allWords) {
  const distractors = allWords
    .filter(w => w.id !== word.id && w.hsk_level === word.hsk_level)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  
  const options = [word, ...distractors]
    .map(w => ({ text: w.meaning, correct: w.id === word.id }))
    .sort(() => 0.5 - Math.random());
  
  return {
    type: 'multipleChoice',
    wordId: word.id,
    question: `What does "${word.simplified}" mean?`,
    pinyin: word.pinyin,
    options: options,
    correctAnswer: word.meaning,
    hint: `Pinyin: ${word.pinyin}`
  };
}

function generateFillBlank(word) {
  return {
    type: 'fillBlank',
    wordId: word.id,
    question: 'Fill in the blank:',
    sentence: word.example_sentence?.replace(word.simplified, '___') || `我喜欢${word.simplified}。`,
    pinyin: word.pinyin,
    correctAnswer: word.simplified,
    hint: word.pinyin
  };
}

function generateTypeAnswer(word) {
  return {
    type: 'typeAnswer',
    wordId: word.id,
    question: `Type the character for: "${word.meaning}"`,
    pinyin: word.pinyin,
    correctAnswer: word.simplified,
    hint: `Pinyin: ${word.pinyin}`
  };
}

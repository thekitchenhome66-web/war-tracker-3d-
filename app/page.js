'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { buildDailyLesson, processAnswer } from '../lib/lesson-assembler';
import ExerciseCard from '../components/ExerciseCard';

export default function LessonPage() {
  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hearts, setHearts] = useState(5);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });

  useEffect(() => {
    const userId = 'test-user-id';
    loadLesson(userId);
  }, []);

  async function loadLesson(userId) {
    try {
      const lesson = await buildDailyLesson(userId);
      setExercises(lesson);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  }

  const handleAnswer = async (exercise, answer, timeSpent) => {
    const userId = 'test-user-id';
    const result = await processAnswer(userId, exercise, answer, timeSpent);
    
    if (result.correct) {
      setStats(s => ({ ...s, correct: s.correct + 1 }));
    } else {
      setStats(s => ({ ...s, wrong: s.wrong + 1 }));
      setHearts(h => Math.max(0, h - 1));
    }
    
    setTimeout(() => {
      if (currentIndex < exercises.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setSessionComplete(true);
      }
    }, 2000);
    
    return result;
  };

  if (loading) return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#FFF8E1', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{ fontSize: '24px' }}>🐼 MaoBai is preparing your lesson...</div>
    </div>
  );

  if (sessionComplete) return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#FFF8E1', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{ 
        background: 'white', 
        padding: '32px', 
        borderRadius: '24px', 
        textAlign: 'center',
        maxWidth: '400px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
        <h2 style={{ marginBottom: '16px' }}>Lesson Complete!</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ background: '#E8F5E9', padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2E7D32' }}>
              {stats.correct}
            </div>
            <div style={{ color: '#2E7D32', fontSize: '14px' }}>Correct</div>
          </div>
          <div style={{ background: '#FFEBEE', padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#C62828' }}>
              {stats.wrong}
            </div>
            <div style={{ color: '#C62828', fontSize: '14px' }}>Wrong</div>
          </div>
        </div>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          Next review scheduled according to 1-2-5-7-14-30 schedule
        </p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            background: '#7CB342',
            color: 'white',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '24px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Study Again Tomorrow
        </button>
      </div>
    </div>
  );

  if (hearts === 0) return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#FFF8E1', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{ 
        background: 'white',
        padding: '32px',
        borderRadius: '24px',
        textAlign: 'center',
        maxWidth: '400px'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>😴</div>
        <h2 style={{ marginBottom: '16px' }}>Out of Hearts!</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          MaoBai is tired. Watch an ad to get 1 heart back or wait 4 hours.
        </p>
        <button style={{
          background: '#FFC107',
          color: '#333',
          border: 'none',
          padding: '16px 32px',
          borderRadius: '24px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: '12px',
          width: '100%'
        }}>
          🎬 Watch Ad (+1 Heart)
        </button>
        <button 
          onClick={() => window.location.reload()}
          style={{
            background: '#E0E0E0',
            color: '#666',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '24px',
            fontSize: '16px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Continue Tomorrow
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#FFF8E1', padding: '16px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '24px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '32px' }}>🐼</span>
            <span style={{ fontWeight: 'bold', fontSize: '20px' }}>MaoBai</span>
          </div>
          <span style={{ color: '#666' }}>
            {currentIndex + 1} / {exercises.length}
          </span>
        </div>
        
        <div style={{ 
          width: '100%', 
          height: '8px', 
          background: '#E0E0E0', 
          borderRadius: '4px',
          marginBottom: '32px'
        }}>
          <div style={{
            width: `${((currentIndex + 1) / exercises.length) * 100}%`,
            height: '100%',
            background: '#7CB342',
            borderRadius: '4px',
            transition: 'width 0.3s'
          }}/>
        </div>

        {exercises[currentIndex] && (
          <ExerciseCard 
            exercise={exercises[currentIndex]}
            onAnswer={handleAnswer}
            hearts={hearts}
          />
        )}
      </div>
    </div>
  );
}

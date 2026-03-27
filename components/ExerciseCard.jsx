'use client';

import { useState } from 'react';

export default function ExerciseCard({ exercise, onAnswer, hearts }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [startTime] = useState(Date.now());
  const [textAnswer, setTextAnswer] = useState('');
  const [result, setResult] = useState(null);

  const handleSelect = async (option) => {
    if (showResult) return;
    setSelectedOption(option);
    setShowResult(true);
    const timeSpent = Date.now() - startTime;
    const res = await onAnswer(exercise, option, timeSpent);
    setResult(res);
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (showResult) return;
    setShowResult(true);
    const timeSpent = Date.now() - startTime;
    const res = await onAnswer(exercise, textAnswer, timeSpent);
    setResult(res);
  };

  if (exercise.type === 'multipleChoice') {
    return (
      <div style={{ 
        background: 'white', 
        borderRadius: '24px', 
        padding: '24px',
        maxWidth: '500px',
        margin: '0 auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ fontSize: '24px' }}>
              {i < hearts ? '❤️' : '🖤'}
            </span>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>
            {exercise.question.match(/"(.*?)"/)?.[1]}
          </div>
          <div style={{ color: '#666', fontSize: '18px' }}>{exercise.pinyin}</div>
          {exercise.isReview && (
            <span style={{ 
              background: '#E3F2FD', 
              color: '#1976D2',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              marginTop: '8px',
              display: 'inline-block'
            }}>
              Review • Box {exercise.leitnerBox}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {exercise.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option.text)}
              disabled={showResult}
              style={{
                padding: '16px',
                borderRadius: '12px',
                border: '2px solid',
                borderColor: showResult
                  ? option.correct ? '#4CAF50' : selectedOption === option.text ? '#f44336' : '#ddd'
                  : '#e0e0e0',
                background: showResult
                  ? option.correct ? '#E8F5E9' : selectedOption === option.text ? '#FFEBEE' : '#f5f5f5'
                  : '#fafafa',
                cursor: showResult ? 'default' : 'pointer',
                textAlign: 'left',
                fontSize: '16px'
              }}
            >
              {option.text}
              {showResult && option.correct && <span style={{ float: 'right', color: '#4CAF50' }}>✓</span>}
              {showResult && selectedOption === option.text && !option.correct && <span style={{ float: 'right', color: '#f44336' }}>✗</span>}
            </button>
          ))}
        </div>

        {showResult && result?.explanation && (
          <div style={{ 
            marginTop: '16px', 
            padding: '16px', 
            background: '#FFF3E0',
            borderRadius: '12px',
            borderLeft: '4px solid #FF9800'
          }}>
            <p style={{ margin: 0, fontSize: '14px' }}>{result.explanation}</p>
          </div>
        )}

        {showResult && !result?.explanation && (
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>
              ✓ Correct! Next review in {result?.nextReviewDays} days
            </p>
          </div>
        )}
      </div>
    );
  }

  if (exercise.type === 'fillBlank' || exercise.type === 'typeAnswer') {
    return (
      <div style={{ 
        background: 'white', 
        borderRadius: '24px', 
        padding: '24px',
        maxWidth: '500px',
        margin: '0 auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ fontSize: '24px' }}>
              {i < hearts ? '❤️' : '🖤'}
            </span>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <p style={{ color: '#666', marginBottom: '8px' }}>{exercise.question}</p>
          {exercise.sentence && (
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{exercise.sentence}</div>
          )}
          <div style={{ color: '#2196F3', fontSize: '20px' }}>{exercise.pinyin}</div>
        </div>

        <form onSubmit={handleTextSubmit}>
          <input
            type="text"
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            disabled={showResult}
            placeholder="Type answer..."
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '20px',
              textAlign: 'center',
              border: '2px solid #ddd',
              borderRadius: '12px',
              marginBottom: '16px'
            }}
          />
          {!showResult && (
            <button 
              type="submit"
              style={{
                width: '100%',
                padding: '16px',
                background: '#7CB342',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Check Answer
            </button>
          )}
        </form>

        {showResult && (
          <div style={{ 
            padding: '16px',
            background: result?.correct ? '#E8F5E9' : '#FFEBEE',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <p style={{ fontWeight: 'bold', color: result?.correct ? '#2E7D32' : '#C62828' }}>
              {result?.correct ? '✓ Correct!' : '✗ Wrong'}
            </p>
            <p>Answer: <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{exercise.correctAnswer}</span></p>
            {result?.explanation && (
              <p style={{ marginTop: '8px', fontSize: '14px' }}>{result.explanation}</p>
            )}
          </div>
        )}
      </div>
    );
  }

  return null;
}

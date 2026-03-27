const LEITNER_INTERVALS = {
  1: 1, 2: 2, 3: 5, 4: 7, 5: 14, 6: 30
};

export function calculateNextReview(boxNumber, isCorrect) {
  if (!isCorrect) {
    return {
      newBox: 1,
      daysUntil: 1,
      nextDate: new Date(Date.now() + 86400000)
    };
  }
  
  const newBox = Math.min(boxNumber + 1, 6);
  const days = LEITNER_INTERVALS[newBox];
  
  return {
    newBox,
    daysUntil: days,
    nextDate: new Date(Date.now() + days * 86400000)
  };
}

import React from 'react';

const VocabularyDiversityMeter = ({ uniqueWordCount = 0, totalWords = 1 }) => {
  const diversity = ((uniqueWordCount / totalWords) * 100).toFixed(2);

  return (
    <div>
      <h3>🧠 Vocabulary Diversity</h3>
      <p>Unique Words: {uniqueWordCount}</p>
      <p>Total Words: {totalWords}</p>
      <p>Diversity Score: {diversity}%</p>
    </div>
  );
};

export default VocabularyDiversityMeter;

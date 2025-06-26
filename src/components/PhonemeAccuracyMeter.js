import React from 'react';

const PhonemeAccuracyMeter = ({ score }) => {
  const accuracy = score ? Math.min(100, Math.max(0, score)) : 0;

  return (
    <div>
      <h3>🔠 Phoneme Accuracy</h3>
      <progress value={accuracy} max="100" />
      <p>{accuracy}% accurate articulation</p>
    </div>
  );
};

export default PhonemeAccuracyMeter;

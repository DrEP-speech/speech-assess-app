import React from 'react';

const SpeechRateVisualizer = ({ wordsPerMinute = 0 }) => {
  return (
    <div>
      <h3>🕒 Speech Rate</h3>
      <p>Words per Minute: <strong>{wordsPerMinute}</strong></p>
    </div>
  );
};

export default SpeechRateVisualizer;

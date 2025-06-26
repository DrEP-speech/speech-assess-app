import React from 'react';

const SpeechComplexityMeter = ({ text }) => {
  const safeText = typeof text === 'string' ? text : '';
  const wordCount = safeText.split(/\s+/).filter(w => w.trim()).length;
  const avgWordLength = wordCount ? (safeText.replace(/\s+/g, '').length / wordCount).toFixed(2) : 0;

  return (
    <div className="complexity-meter">
      <h3>🧠 Speech Complexity Meter</h3>
      <p>Word Count: <strong>{wordCount}</strong></p>
      <p>Avg. Word Length: <strong>{avgWordLength}</strong> chars</p>
    </div>
  );
};

export default SpeechComplexityMeter;

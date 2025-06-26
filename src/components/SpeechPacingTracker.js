import React from 'react';

const SpeechPacingTracker = ({ transcript }) => {
  const safeTranscript = typeof transcript === 'string' ? transcript : '';
  const wordCount = safeTranscript.split(/\s+/).filter(word => word.trim() !== '').length;
  const estimatedDurationInSeconds = 60; // Placeholder
  const wordsPerMinute = ((wordCount / estimatedDurationInSeconds) * 60).toFixed(2);

  return (
    <div className="pacing-tracker">
      <h3>⏱️ Speech Pacing Tracker</h3>
      <p>Word Count: <strong>{wordCount}</strong></p>
      <p>Estimated Words Per Minute: <strong>{wordsPerMinute}</strong></p>
    </div>
  );
};

export default SpeechPacingTracker;

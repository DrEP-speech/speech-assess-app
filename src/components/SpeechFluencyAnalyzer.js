import React from 'react';

const SpeechFluencyAnalyzer = ({ transcript }) => {
  const detectDisfluencies = (text) => {
    const disfluencyWords = ['um', 'uh', 'like', 'you know'];
    const words = text.toLowerCase().split(/\s+/);
    return words.filter(word => disfluencyWords.includes(word)).length;
  };

  const disfluencyCount = transcript ? detectDisfluencies(transcript) : 0;

  return (
    <div>
      <h3>🔍 Fluency Analyzer</h3>
      <p>Disfluencies Detected: {disfluencyCount}</p>
    </div>
  );
};

export default SpeechFluencyAnalyzer;

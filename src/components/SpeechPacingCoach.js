import React, { useState, useEffect } from 'react';

const SpeechPacingCoach = ({ transcript }) => {
  const [pacingFeedback, setPacingFeedback] = useState('');
  const [wordsPerMinute, setWordsPerMinute] = useState(0);

  useEffect(() => {
    if (transcript) {
      const wordCount = transcript.split(' ').length;
      const durationInMinutes = 1; // Placeholder
      const wpm = Math.round(wordCount / durationInMinutes);
      setWordsPerMinute(wpm);

      if (wpm < 90) {
        setPacingFeedback('Too slow. Try increasing your pace.');
      } else if (wpm > 160) {
        setPacingFeedback('Too fast. Try speaking more clearly and slowly.');
      } else {
        setPacingFeedback('Great pacing!');
      }
    }
  }, [transcript]);

  return (
    <div>
      <h3>🕓 Speech Pacing Coach</h3>
      <p><strong>WPM:</strong> {wordsPerMinute}</p>
      <p>{pacingFeedback}</p>
    </div>
  );
};

export default SpeechPacingCoach;

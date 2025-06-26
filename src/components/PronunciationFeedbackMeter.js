import React from 'react';

const PronunciationFeedbackMeter = ({ transcript }) => {
  const safeTranscript = typeof transcript === 'string' ? transcript : '';
  const mispronouncedWords = ['r', 'l', 's'].filter(sound =>
    !safeTranscript.toLowerCase().includes(sound)
  );

  return (
    <div className="pronunciation-feedback">
      <h3>🔊 Pronunciation Feedback</h3>
      {mispronouncedWords.length > 0 ? (
        <ul>
          {mispronouncedWords.map((w, i) => (
            <li key={i}>Missing /{w}/ sound</li>
          ))}
        </ul>
      ) : (
        <p><strong>✔ All expected sounds detected</strong></p>
      )}
    </div>
  );
};

export default PronunciationFeedbackMeter;

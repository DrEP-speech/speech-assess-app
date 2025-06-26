import React from 'react';

const AIPronunciationCoach = ({ tips = [] }) => {
  return (
    <div>
      <h3>🧑‍🏫 AI Pronunciation Coach</h3>
      <ul>
        {tips.length > 0 ? (
          tips.map((tip, index) => <li key={index}>{tip}</li>)
        ) : (
          <li>No feedback available. Try uploading a sample.</li>
        )}
      </ul>
    </div>
  );
};

export default AIPronunciationCoach;

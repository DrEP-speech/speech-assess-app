import React from 'react';

const AIResponseCoach = ({ score }) => {
  const feedback = score >= 90
    ? "Outstanding! Your speech is clear and confident."
    : score >= 75
    ? "Good work! Focus on refining a few sounds."
    : "Keep practicing. You're making progress every step!";

  return (
    <div>
      <h3>🎧 AI Response Coach</h3>
      <p>{feedback}</p>
    </div>
  );
};

export default AIResponseCoach;

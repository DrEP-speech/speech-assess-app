import React from 'react';

const ClarityFeedbackMeter = ({ clarityScore = 0 }) => {
  let level = 'Low';
  if (clarityScore > 75) level = 'High';
  else if (clarityScore > 40) level = 'Moderate';

  return (
    <div>
      <h3>🎙️ Clarity Feedback Meter</h3>
      <p>Score: {clarityScore}%</p>
      <p>Clarity Level: <strong>{level}</strong></p>
    </div>
  );
};

export default ClarityFeedbackMeter;

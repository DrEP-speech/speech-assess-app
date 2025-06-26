import React from 'react';

const TherapyPathwaySuggestor = ({ score }) => {
  const suggestPath = () => {
    if (score >= 85) return "You're doing great! Continue practicing independently.";
    if (score >= 60) return "Consider a guided therapy session 2x per week.";
    return "We recommend intensive therapy with a certified SLP 3x per week.";
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Therapy Recommendation</h3>
      <p>{suggestPath()}</p>
    </div>
  );
};

export default TherapyPathwaySuggestor;

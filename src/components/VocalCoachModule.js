// src/components/VocalCoachModule.js
import React, { useState } from 'react';

const VocalCoachModule = () => {
  const [feedback, setFeedback] = useState('Start practicing to receive feedback.');

  const handlePractice = () => {
    // Placeholder logic
    setFeedback("Good pitch control. Try elongating vowel sounds.");
  };

  return (
    <div className="module-card">
      <h3>🎤 Vocal Coach</h3>
      <p>{feedback}</p>
      <button onClick={handlePractice}>Practice</button>
    </div>
  );
};

export default VocalCoachModule;

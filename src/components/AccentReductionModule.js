// src/components/AccentReductionModule.js
import React, { useState } from 'react';

const AccentReductionModule = () => {
  const [sessionResult, setSessionResult] = useState('');

  const runAccentCheck = () => {
    setSessionResult("Your /r/ sound is improving. Try slowing your rate slightly.");
  };

  return (
    <div className="module-card">
      <h3>🌎 Accent Reduction</h3>
      <button onClick={runAccentCheck}>Run Accent Evaluation</button>
      <p>{sessionResult}</p>
    </div>
  );
};

export default AccentReductionModule;

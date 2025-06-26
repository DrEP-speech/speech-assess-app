// src/components/FluencyAnomalyDetector.js
import React from 'react';

const FluencyAnomalyDetector = ({ fillerWords = 0, pauses = 0 }) => {
  return (
    <div style={{ marginTop: '30px' }}>
      <h3>⛔ Fluency Anomaly Detector</h3>
      <p>Filler Words Detected: <strong>{fillerWords}</strong></p>
      <p>Pauses Detected: <strong>{pauses}</strong></p>
    </div>
  );
};

export default FluencyAnomalyDetector;

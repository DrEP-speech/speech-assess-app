import React from 'react';

const FluencyAnomalyDetector = ({ fillerWords = 0, pauses = 0 }) => {
  return (
    <div>
      <h3>⛔ Fluency Anomalies</h3>
      <p>Filler Words: {fillerWords}</p>
      <p>Pauses Detected: {pauses}</p>
    </div>
  );
};

export default FluencyAnomalyDetector;

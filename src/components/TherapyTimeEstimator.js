import React from 'react';

const TherapyTimeEstimator = ({ transcript }) => {
  const safeTranscript = typeof transcript === 'string' ? transcript : '';
  const lengthScore = safeTranscript.split(/\s+/).length;
  const estimatedSessions = Math.ceil(lengthScore / 50); // placeholder

  return (
    <div className="time-estimator">
      <h3>⏳ Estimated Therapy Time</h3>
      <p>Based on current analysis, estimated sessions: <strong>{estimatedSessions}</strong></p>
    </div>
  );
};

export default TherapyTimeEstimator;

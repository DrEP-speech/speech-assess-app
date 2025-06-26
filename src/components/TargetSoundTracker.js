import React from 'react';

const TargetSoundTracker = ({ transcript }) => {
  const soundCounts = {
    s: (transcript.match(/s/gi) || []).length,
    r: (transcript.match(/r/gi) || []).length,
    l: (transcript.match(/l/gi) || []).length,
  };

  return (
    <div>
      <h3>🎯 Target Sound Tracker</h3>
      <ul>
        <li>/s/: {soundCounts.s}</li>
        <li>/r/: {soundCounts.r}</li>
        <li>/l/: {soundCounts.l}</li>
      </ul>
    </div>
  );
};

export default TargetSoundTracker;

import React from 'react';

const VoiceEnergyMonitor = ({ decibelLevel = 0 }) => {
  return (
    <div>
      <h3>🔊 Voice Energy</h3>
      <p>Decibel Level: {decibelLevel} dB</p>
    </div>
  );
};

export default VoiceEnergyMonitor;

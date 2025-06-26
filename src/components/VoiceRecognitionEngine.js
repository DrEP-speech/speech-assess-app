// src/components/VoiceRecognitionEngine.js
import React, { useState } from 'react';

const VoiceRecognitionEngine = () => {
  const [transcript, setTranscript] = useState('');

  const handleVoiceInput = () => {
    setTranscript("Recognized speech: 'She sells sea shells by the sea shore'");
  };

  return (
    <div className="module-card">
      <h3>🗣️ Voice Recognition</h3>
      <button onClick={handleVoiceInput}>Capture Voice</button>
      <p>{transcript}</p>
    </div>
  );
};

export default VoiceRecognitionEngine;

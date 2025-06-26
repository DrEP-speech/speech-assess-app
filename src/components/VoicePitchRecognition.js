import React, { useState } from 'react';
import axios from 'axios';
import './styles/VoicePitchRecognition.css';

const VoicePitchRecognition = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [pitchResult, setPitchResult] = useState(null);

  const handleAudioChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const analyzeVoicePitch = async () => {
    if (!audioFile) return;
    const formData = new FormData();
    formData.append('audio', audioFile);

    try {
      const response = await axios.post('/api/voice-pitch', formData);
      setPitchResult(response.data);
    } catch (error) {
      console.error('Pitch analysis failed:', error);
    }
  };

  return (
    <div className="voice-pitch">
      <h3>🎵 Voice Pitch Recognition</h3>
      <input type="file" accept="audio/*" onChange={handleAudioChange} />
      <button onClick={analyzeVoicePitch}>Analyze Pitch</button>
      {pitchResult && (
        <div className="pitch-result">
          <p><strong>Pitch Range:</strong> {pitchResult.range}</p>
          <p><strong>Mean Pitch:</strong> {pitchResult.meanPitch} Hz</p>
        </div>
      )}
    </div>
  );
};

export default VoicePitchRecognition;

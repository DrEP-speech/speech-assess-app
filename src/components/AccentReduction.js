import React, { useState } from 'react';
import axios from 'axios';
import './styles/AccentReduction.css';

const AccentReduction = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleAudioChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const analyzeAccent = async () => {
    if (!audioFile) return;
    const formData = new FormData();
    formData.append('audio', audioFile);

    try {
      const response = await axios.post('/api/accent-analysis', formData);
      setFeedback(response.data);
    } catch (error) {
      console.error('Accent analysis failed:', error);
    }
  };

  return (
    <div className="accent-reduction">
      <h3>🗣️ Accent Reduction Feedback</h3>
      <input type="file" accept="audio/*" onChange={handleAudioChange} />
      <button onClick={analyzeAccent}>Analyze Accent</button>
      {feedback && (
        <div className="accent-feedback">
          <p><strong>Accent Clarity:</strong> {feedback.clarityScore}/10</p>
          <p><strong>Recommendations:</strong> {feedback.recommendations}</p>
        </div>
      )}
    </div>
  );
};

export default AccentReduction;

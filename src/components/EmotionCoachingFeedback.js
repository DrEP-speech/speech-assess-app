// src/components/EmotionCoachingFeedback.js
import React, { useContext, useEffect } from 'react';
import { EmotionCoachingContext } from './EmotionCoachingContext';

const EmotionCoachingFeedback = () => {
  const { emotionData, fetchEmotionData } = useContext(EmotionCoachingContext);

  useEffect(() => {
    fetchEmotionData(); // Auto-fetch once mounted
  }, []);

  return (
    <div className="emotion-coaching-feedback">
      <h3>🧘 Real-Time Emotion Coaching</h3>
      {emotionData ? (
        <div>
          <p><strong>Detected Emotion:</strong> {emotionData.emotion}</p>
          <p><strong>Confidence:</strong> {emotionData.confidence}%</p>
          <p><strong>Coaching Tip:</strong> {emotionData.tip}</p>
        </div>
      ) : (
        <p>Loading emotion insights...</p>
      )}
    </div>
  );
};

export default EmotionCoachingFeedback;

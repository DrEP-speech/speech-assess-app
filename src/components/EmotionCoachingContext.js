// src/components/EmotionCoachingContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const EmotionCoachingContext = createContext();

export const EmotionCoachingProvider = ({ children }) => {
  const [emotionData, setEmotionData] = useState(null);

  const fetchEmotionData = async () => {
    try {
      const response = await axios.get('/api/emotion-analysis');
      setEmotionData(response.data);
    } catch (error) {
      console.error('Failed to fetch emotion analysis:', error);
    }
  };

  return (
    <EmotionCoachingContext.Provider value={{ emotionData, fetchEmotionData }}>
      {children}
    </EmotionCoachingContext.Provider>
  );
};

import axios from 'axios';
import { useState } from 'react';

const useAccentAnalysis = (audioBlob) => {
  const [accentResults, setAccentResults] = useState(null);

  const fetchAccentAnalysis = async () => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);

      const response = await axios.post('/api/accent-analysis', formData);
      setAccentResults(response.data);
    } catch (error) {
      console.error('Error analyzing accent:', error);
    }
  };

  return { accentResults, fetchAccentAnalysis };
};

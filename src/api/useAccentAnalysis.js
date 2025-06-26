
import { useState } from 'react';
import axios from 'axios';

const useAccentAnalysis = () => {
  const [accentData, setAccentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeAccent = async (audioBlob) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);
      const response = await axios.post('/api/accent-analysis', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAccentData(response.data);
    } catch (err) {
      setError(err.message || 'Error analyzing accent.');
    } finally {
      setLoading(false);
    }
  };

  return { accentData, loading, error, analyzeAccent };
};

export default useAccentAnalysis;
import { useState } from 'react';
import axios from 'axios';

const useVoiceRecognition = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const recognizeVoice = async (audioBlob) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);
      const response = await axios.post('/api/voice-recognition', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (err) {
      setError(err.message || 'Voice recognition failed.');
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, recognizeVoice };
};

export default useVoiceRecognition;
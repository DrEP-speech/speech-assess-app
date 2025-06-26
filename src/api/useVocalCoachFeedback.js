import { useState } from 'react';
import axios from 'axios';

const useVocalCoachFeedback = () => {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getVocalCoachFeedback = async (audioBlob) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);
      const response = await axios.post('/api/vocal-coach-feedback', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFeedback(response.data);
    } catch (err) {
      setError(err.message || 'Error getting vocal coach feedback.');
    } finally {
      setLoading(false);
    }
  };

  return { feedback, loading, error, getVocalCoachFeedback };
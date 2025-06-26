import axios from 'axios';
import { useState } from 'react';

const useVocalCoachFeedback = (audioBlob) => {
  const [coachFeedback, setCoachFeedback] = useState(null);

  const fetchVocalCoachFeedback = async () => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);

      const response = await axios.post('/api/vocal-coach', formData);
      setCoachFeedback(response.data);
    } catch (error) {
      console.error('Error fetching vocal coach feedback:', error);
    }
  };

  return { coachFeedback, fetchVocalCoachFeedback };
};

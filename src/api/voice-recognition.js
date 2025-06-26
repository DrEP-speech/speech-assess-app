import axios from 'axios';
import { useState } from 'react';

const useVoiceRecognition = (audioBlob) => {
  const [voiceData, setVoiceData] = useState(null);

  const fetchVoiceRecognition = async () => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);

      const response = await axios.post('/api/voice-recognition', formData);
      setVoiceData(response.data);
    } catch (error) {
      console.error('Voice recognition error:', error);
    }
  };

  return { voiceData, fetchVoiceRecognition };
};

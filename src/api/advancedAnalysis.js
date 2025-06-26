import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const analyzeVoicePitch = async (audioBlob) => {
  const formData = new FormData();
  formData.append('audio', audioBlob);
  const response = await axios.post(`${API_BASE}/voice-pitch`, formData);
  return response.data;
};

export const analyzeAccent = async (audioBlob) => {
  const formData = new FormData();
  formData.append('audio', audioBlob);
  const response = await axios.post(`${API_BASE}/accent-analysis`, formData);
  return response.data;
};

export const analyzeVocalCoachFeedback = async (audioBlob) => {
  const formData = new FormData();
  formData.append('audio', audioBlob);
  const response = await axios.post(`${API_BASE}/vocal-coach`, formData);
  return response.data;
};

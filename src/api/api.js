import axios from 'axios';

axios.post('http://localhost:5000/api/scoring/calculate-standard-score', { rawScore, age });

const BASE_URL = 'http://localhost:5000/api'; // or use your deployed server URL
const jwt = require('jsonwebtoken');
const token = jwt.sign({ role: 'therapist' }, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log(token);

// Speech Score API
export const submitSpeechScore = (scoreData) => axios.post(`${BASE_URL}/scores`, scoreData);
export const fetchSpeechScores = () => axios.get(`${BASE_URL}/scores`);
export const fetchScoreById = (id) => axios.get(`${BASE_URL}/scores/${id}`);
export const calculateStandardScore = (rawScore, age) =>
export const fetchUserProgress = (userId) =>
  axios.get(`/api/progress/user/${userId}`);

export const saveProgressEntry = (data) =>
  axios.post('/api/progress/create', data);


// Accent Analysis API
export const analyzeAccent = (audioData) => axios.post(`${BASE_URL}/accent/analyze`, audioData);

// Pitch Recognition API
export const analyzeVoicePitch = (audioData) => axios.post(`${BASE_URL}/pitch/analyze`, audioData);

// Emotion Coaching API
export const analyzeEmotion = (audioData) => axios.post(`${BASE_URL}/emotion/analyze`, audioData);

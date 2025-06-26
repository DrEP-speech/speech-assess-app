require('dotenv').config();
const jwt = require('jsonwebtoken');

const payload = { role: 'therapist', userId: '1234567890' }; // Replace with real user ID or role
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

console.log('Generated JWT:', token);

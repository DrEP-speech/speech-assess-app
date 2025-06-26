// routes/scoreSpeech.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { transcript } = req.body;

  if (!transcript) {
    return res.status(400).json({ error: 'Transcript is required' });
  }

  // Placeholder AI scoring logic
  const score = Math.floor(Math.random() * 100) + 1;

  res.json({
    transcript,
    score,
    feedback: score > 75 ? 'Great articulation!' : 'Keep practicing!'
  });
});

module.exports = router;

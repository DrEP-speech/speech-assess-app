const express = require('express');
const router = express.Router();
const SpeechScore = require('../models/SpeechScore');

// Save speech score
router.post('/score-ai', async (req, res) => {
  try {
    const { transcript, score, notes } = req.body;
    const entry = new SpeechScore({ transcript, score, notes });
    await entry.save();
    res.status(201).json({ message: 'Score saved successfully', entry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get latest scores
router.get('/scores', async (req, res) => {
  try {
    const scores = await SpeechScore.find().sort({ createdAt: -1 }).limit(10);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
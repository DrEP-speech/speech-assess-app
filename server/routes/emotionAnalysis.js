const express = require('express');
const router = express.Router();

// Dummy route for emotion analysis
router.post('/', (req, res) => {
  const { transcript } = req.body;

  // Basic fake emotion logic for testing
  const emotions = ['joy', 'anger', 'sadness', 'neutral'];
  const detected = emotions[Math.floor(Math.random() * emotions.length)];

  res.json({
    emotion: detected,
    confidence: Math.floor(Math.random() * 100) + 1
  });
});

module.exports = router;

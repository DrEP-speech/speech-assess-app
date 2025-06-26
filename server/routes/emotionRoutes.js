const express = require('express');
const router = express.Router();

// Dummy emotion detection from text (placeholder logic)
const analyzeEmotion = (text) => {
  const lower = text.toLowerCase();
  if (lower.includes('angry')) return 'Anger';
  if (lower.includes('happy')) return 'Joy';
  if (lower.includes('sad')) return 'Sadness';
  if (lower.includes('scared')) return 'Fear';
  return 'Neutral';
};

// ✅ POST /api/emotion/analyze
router.post('/analyze', (req, res) => {
  const { inputText } = req.body;

  if (!inputText || typeof inputText !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid inputText' });
  }

  const emotion = analyzeEmotion(inputText);

  res.json({
    emotion,
    inputText,
    confidence: 0.85 // placeholder confidence
  });
});

module.exports = router;

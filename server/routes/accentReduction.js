// routes/accentReduction.js
const express = require('express');
const router = express.Router();

// POST /api/accentReduction
router.post('/', async (req, res) => {
  try {
    const { transcript, region } = req.body;

    // Placeholder: simulate accent analysis
    const response = {
      detectedAccent: region || 'Southern US',
      suggestions: [
        "Practice neutral vowel sounds.",
        "Work on intonation and rhythm using audio models.",
        "Record and playback exercises with minimal accent variance."
      ]
    };

    res.json(response);
  } catch (error) {
    console.error('Accent reduction error:', error);
    res.status(500).json({ error: 'Accent analysis failed.' });
  }
});

module.exports = router;

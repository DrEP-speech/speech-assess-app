const express = require('express');
const router = express.Router();

// Utility function: Calculate average pitch
const calculateAveragePitch = (pitches) => {
  if (!pitches || pitches.length === 0) return 0;
  const sum = pitches.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / pitches.length);
};

// ✅ POST: Analyze pitch data
router.post('/analyze', (req, res) => {
  try {
    const { pitchSamples, gender } = req.body;

    if (!Array.isArray(pitchSamples) || pitchSamples.length === 0) {
      return res.status(400).json({ error: 'pitchSamples must be a non-empty array' });
    }

    const averagePitch = calculateAveragePitch(pitchSamples);

    // Simple pitch range logic (in Hz)
    const pitchRange = {
      male: { min: 85, max: 180 },
      female: { min: 165, max: 255 },
      default: { min: 100, max: 240 }
    };

    const range = pitchRange[gender?.toLowerCase()] || pitchRange.default;
    let result = 'Normal pitch';

    if (averagePitch < range.min) result = 'Below typical pitch range';
    else if (averagePitch > range.max) result = 'Above typical pitch range';

    res.json({
      averagePitch,
      range: `${range.min}–${range.max} Hz`,
      result,
      totalSamples: pitchSamples.length
    });
  } catch (err) {
    console.error('Pitch analysis error:', err);
    res.status(500).json({ error: 'Failed to analyze pitch.' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// ✅ POST: Submit a new score
router.post('/submit', async (req, res) => {
  try {
    const newScore = new Score(req.body);
    await newScore.save();
    res.status(201).json(newScore);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save score.' });
  }
});

// ✅ GET: All scores
router.get('/', async (req, res) => {
  try {
    const scores = await Score.find().sort({ createdAt: -1 });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve scores.' });
  }
});

// ✅ GET: Scores for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve user scores.' });
  }
});

// ✅ POST: Calculate standard score using bell curve
router.post('/calculate-standard-score', async (req, res) => {
  try {
    const { rawScore, testType, age } = req.body;

    // 🔢 Example norm values – replace with real norm data as needed
    const normMean = 100;
    const normSD = 15;

    // Bell curve calculation
    const zScore = (rawScore - normMean) / normSD;
    const standardScore = Math.round(zScore * 15 + 100);

    // Approximate percentile using z-score
    const percentileRank = Math.round(50 * (1 + erf(zScore / Math.SQRT2)));

    function erf(x) {
      // Approximation of the error function
      const sign = x >= 0 ? 1 : -1;
      const a1 = 0.254829592,
            a2 = -0.284496736,
            a3 = 1.421413741,
            a4 = -1.453152027,
            a5 = 1.061405429,
            p = 0.3275911;

      const t = 1 / (1 + p * Math.abs(x));
      const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
      return sign * y;
    }

    res.json({
      rawScore,
      standardScore,
      percentileRank,
      age,
      testType
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to calculate standard score.' });
  }
});


module.exports = router;







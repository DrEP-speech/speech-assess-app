// routes/scoreHistoryRoutes.js
const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// @route   GET /api/scores
// @desc    Get all scores with optional filters (user, date, minScore, maxScore)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { user, startDate, endDate, minScore, maxScore } = req.query;

    const query = {};
    if (user) query.user = user;
    if (startDate || endDate) query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
    if (minScore || maxScore) query.score = {};
    if (minScore) query.score.$gte = parseFloat(minScore);
    if (maxScore) query.score.$lte = parseFloat(maxScore);

    const scores = await Score.find(query).sort({ createdAt: -1 });

    res.json(scores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

// controllers/scoreController.js
const Score = require('../models/Score');

// Create new score
exports.createScore = async (req, res) => {
  try {
    const newScore = new Score(req.body);
    const savedScore = await newScore.save();
    res.status(201).json(savedScore);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create score', details: err });
  }
};

// Get all scores
exports.getAllScores = async (req, res) => {
  try {
    const scores = await Score.find().sort({ createdAt: -1 });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch scores', details: err });
  }
};

// Filter scores (name, minScore, maxScore)
exports.filterScores = async (req, res) => {
  try {
    const { name, minScore, maxScore } = req.query;
    const query = {};

    if (name) query.name = { $regex: name, $options: 'i' };
    if (minScore) query.score = { ...query.score, $gte: Number(minScore) };
    if (maxScore) query.score = { ...query.score, $lte: Number(maxScore) };

    const results = await Score.find(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Filtering failed', details: err });
  }
};
module.exports = {
  submitScore,
  getScoreHistory,
  filterScores,
  getLatestScore,
  analyzeSpeech,
  analyzeVoicePitch,
  analyzeAccent,
  analyzeGrammarFluency,
  generateSummaryReport,
  generateTherapyRecommendations
};

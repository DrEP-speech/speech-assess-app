const Progress = require('../models/Progress');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

// GET all progress entries for user
router.get('/user/:userId', verifyToken, async (req, res) => {
  const { userId } = req.params;
  const data = await Progress.find({ userId }).sort({ date: 1 });
  res.json(data);
});

// POST new progress entry
router.post('/create', verifyToken, async (req, res) => {
  const entry = new Progress(req.body);
  await entry.save();
  res.json({ message: 'Progress saved' });
});
router.get('/all', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  const data = await Progress.find().sort({ date: 1 });
  res.json(data);
});
router.get('/user/:userId', verifyToken, async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.params.userId });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch progress data' });
  }
});
module.exports = router;

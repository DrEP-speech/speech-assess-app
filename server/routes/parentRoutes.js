const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Score = require('../models/Score');
const { protect } = require('../middleware/authMiddleware');

// GET /api/parents/:id/children-progress
router.get('/:id/children-progress', protect, async (req, res) => {
  const parentId = req.params.id;
  const children = await Client.find({ parentId }).populate('therapistId');

  const progress = await Promise.all(children.map(async (child) => {
    const scores = await Score.find({ childId: child._id }).sort({ createdAt: -1 });
    const lastSession = scores[0];
    return {
      childId: child._id,
      childName: child.name,
      therapistName: child.therapistId?.name || null,
      recentScore: lastSession?.score || null,
      lastSessionDate: lastSession?.createdAt || null,
      progressNote: lastSession?.note || null,
    };
  }));

  res.json(progress);
});

module.exports = router;

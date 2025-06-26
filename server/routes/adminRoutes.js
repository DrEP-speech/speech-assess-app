const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Admin: View all message threads by child ID
router.get('/messages/thread/:childId', protect, adminOnly, async (req, res) => {
  try {
    const messages = await Message.find({ childId: req.params.childId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve thread' });
  }
});

module.exports = router;

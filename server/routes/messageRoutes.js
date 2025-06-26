const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { notifyTherapistOfParentMessage } = require('../utils/notifyTherapist');
await notifyTherapistOfParentMessage(childId, content);
const messageSchema = new mongoose.Schema({
  childId: { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true },
  senderType: { type: String, enum: ['parent', 'therapist'], required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, refPath: 'senderType' },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


// POST /api/messages/send
router.post('/send', async (req, res) => {
  try {
    const { childId, senderRole, content } = req.body;

    const newMessage = await Message.create({ childId, senderRole, content });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

// GET /api/messages/thread/:childId
router.get('/thread/:childId', async (req, res) => {
  try {
    const messages = await Message.find({ childId: req.params.childId })
      .sort({ sentAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch thread.' });
  }
});

module.exports = mongoose.model('Message', messageSchema);
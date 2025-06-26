const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  senderRole: {
    type: String,
    enum: ['parent', 'therapist'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', messageSchema);

const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String }, // Optional, used for communication
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  assignedAt: {
    type: Date, // ✅ NEW: Timestamp when therapist assigned
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Client', ClientSchema);

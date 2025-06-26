const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session'
  },
  domain: {
    type: String, // e.g., "fluency", "clarity", "grammar"
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  label: String, // e.g., "Week 1", "Post Test", etc.
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);

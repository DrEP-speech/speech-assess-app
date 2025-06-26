// models/Score.js
const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  assessmentType: {
    type: String,
    default: 'General',
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Score', ScoreSchema);

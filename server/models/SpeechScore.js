const mongoose = require('mongoose');

const speechScoreSchema = new mongoose.Schema({
  transcript: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SpeechScore = mongoose.model('SpeechScore', speechScoreSchema);

module.exports = SpeechScore;

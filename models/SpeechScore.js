const mongoose = require('mongoose');

const SpeechScoreSchema = new mongoose.Schema({
  transcript: { type: String, required: true },
  score: { type: Number, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SpeechScore', SpeechScoreSchema);

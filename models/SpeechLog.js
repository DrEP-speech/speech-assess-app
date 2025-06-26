// server/models/SpeechLog.js
const mongoose = require('mongoose');

const SpeechLogSchema = new mongoose.Schema({
  transcript: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    default: 'Speech scored and saved.'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SpeechLog', SpeechLogSchema);

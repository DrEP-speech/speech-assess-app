const mongoose = require('mongoose');

const SpeechScoreSchema = new mongoose.Schema({
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
    default: ''
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model('SpeechScore', SpeechScoreSchema);

module.exports = router;
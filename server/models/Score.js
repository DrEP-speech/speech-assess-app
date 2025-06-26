const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  testType: { type: String, required: true },
  rawScore: { type: Number, required: true },
  standardScore: { type: Number },
  percentileRank: { type: Number },
  age: { type: Number },
  domain: { type: String }, // e.g., "fluency", "articulation", etc.
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', ScoreSchema);

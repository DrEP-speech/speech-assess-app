const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: String,
  date: Date,
  benchmark: String, // e.g., 'GFTA Week 1'
  fluency: Number,
  grammar: Number,
  clarity: Number
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);

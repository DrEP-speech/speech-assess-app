const mongoose = require('mongoose');

const normSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g. 'articulation', 'fluency'
  age: { type: String, required: true },  // e.g. '4-5', '6-7'
  mean: { type: Number, required: true },
  stdDev: { type: Number, required: true }
});

module.exports = mongoose.model('Norm', normSchema);

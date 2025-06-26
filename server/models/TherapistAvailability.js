const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  date: String,
  slots: [String]
});

module.exports = mongoose.model('TherapistAvailability', availabilitySchema);

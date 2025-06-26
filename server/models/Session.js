const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
  childId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  date: { type: Date, required: true },
  isTelehealth: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'no-show', 'cancelled'],
    default: 'scheduled',
  },
  notes: String,
  attendedAt: Date,
  icdCode: String,
  cptCode: String,
aiSummary: { type: String },
  hipaaConsent: { type: Boolean, default: false }
});

module.exports = mongoose.model('Session', sessionSchema);


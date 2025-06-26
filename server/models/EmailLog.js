const mongoose = require('mongoose');

const EmailLogSchema = new mongoose.Schema({
  to: String,
  subject: String,
  status: { type: String, enum: ['SUCCESS', 'FAILURE'] },
  timestamp: { type: Date, default: Date.now },
  error: String,
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', default: null },
});

therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

module.exports = mongoose.model('EmailLog', EmailLogSchema);

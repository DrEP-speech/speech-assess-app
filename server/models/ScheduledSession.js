const mongoose = require('mongoose');

const AuditEntrySchema = new mongoose.Schema({
  action: String,
  user: String,
  timestamp: { type: Date, default: Date.now }
});

const ScheduledSessionSchema = new mongoose.Schema({
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  sessionType: String,
  date: Date,
  duration: Number,
  attended: Boolean,
  completed: Boolean,
  completedAt: Date,
  notes: String,
  icdCodes: [String],
  cptCodes: [String],
  flags: [String],
  zoomLink: String,
  followUpEmailSent: Boolean,
  aiSummary: String,
  autoAlerts: {
    missingNotes: Boolean,
    missingAttendance: Boolean
  },
  auditTrail: [AuditEntrySchema]
}, { timestamps: true });

module.exports = mongoose.model('ScheduledSession', ScheduledSessionSchema);

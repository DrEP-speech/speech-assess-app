const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  changes: Object,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AuditLog', auditLogSchema);

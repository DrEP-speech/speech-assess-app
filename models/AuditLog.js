const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },   // Optional for general events
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },         // Who performed the action (therapist, admin, etc.)
  action: { type: String, required: true },                              // e.g., 'Submitted Consent', 'Generated Zoom Link', 'Updated Score'
  details: { type: String },                                             // Optional freeform text or URL/link
  timestamp: { type: Date, default: Date.now },
  category: { type: String },                                            // e.g., 'telehealth', 'scoring', 'consent', 'system'
  ipAddress: { type: String },                                           // For security / compliance tracking
  success: { type: Boolean, default: true }                              // Whether the action completed successfully
});

module.exports = mongoose.model('AuditLog', auditLogSchema);

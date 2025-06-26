const logAuditEvent = async (sessionId, userId, action, metadata = {}) => {
  try {
    await AuditLog.create({
      sessionId,
      userId,
      action,
      metadata,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Audit log failed:', error);
  }
};

module.exports = { logAuditEvent };

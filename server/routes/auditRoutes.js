const { sendAuditFlagAlert } = require('../utils/emailService');

router.post('/flag-session', async (req, res) => {
  const { sessionId, userId, clientName } = req.body;

  await AuditLog.create({
    sessionId,
    userId,
    action: 'System: Audit Flag Triggered',
    category: 'audit',
    success: false,
    details: 'Automatic audit flag raised due to detection logic',
  });

  await sendAuditFlagAlert({
    to: process.env.ADMIN_EMAIL,
    sessionId,
    clientName,
  });

  res.json({ success: true, message: 'Audit log created and email sent' });
});

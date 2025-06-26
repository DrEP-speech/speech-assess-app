const router = require('express').Router();
const sendEmailNotification = require('../utils/sendEmailNotification');

// POST /api/notifications/resend
router.post('/resend', async (req, res) => {
  const { to, subject, text, sessionId } = req.body;

  try {
    await sendEmailNotification({ to, subject, text, sessionId });
    res.json({ success: true });
  } catch (err) {
    console.error('Resend failed:', err);
    res.status(500).json({ error: 'Resend failed' });
  }
});

module.exports = router;

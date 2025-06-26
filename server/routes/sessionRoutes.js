const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const AuditLog = require('../models/AuditLog');

// Save telehealth link
router.post('/telehealth-link/:sessionId', async (req, res) => {
  const { link, user } = req.body;
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.sessionId,
      { telehealthLink: link },
      { new: true }
    );

    await AuditLog.create({
      sessionId: session._id,
      userId: user.id,
      action: 'Telehealth link generated',
      category: 'telehealth',
      success: true,
      details: `Link: ${link}`,
    });

    res.json({ success: true, session });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save telehealth link' });
  }
});

// Save HIPAA consent
router.post('/telehealth-consent/:sessionId', async (req, res) => {
  const { consentGiven, user } = req.body;
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.sessionId,
      { hipaaConsent: consentGiven },
      { new: true }
    );

    await AuditLog.create({
      sessionId: session._id,
      userId: user.id,
      action: 'HIPAA consent recorded',
      category: 'telehealth',
      success: true,
      details: `Consent: ${consentGiven}`,
    });

    res.json({ success: true, session });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record consent' });
  }
});

module.exports = router;

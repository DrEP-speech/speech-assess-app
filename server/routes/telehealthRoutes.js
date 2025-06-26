const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const AuditLog = require('../models/AuditLog');

router.post('/generate-link', async (req, res) => {
  const { sessionId } = req.body;
  const fakeLink = `https://meet.fakehealth.com/session/${sessionId}`;

  await Session.findByIdAndUpdate(sessionId, { telehealthLink: fakeLink });

  await AuditLog.create({
    sessionId,
    action: 'Generated telehealth link',
    details: fakeLink,
  });

  res.json({ link: fakeLink });
});
router.post('/consent', async (req, res) => {
  const { sessionId, name } = req.body;

  await Session.findByIdAndUpdate(sessionId, {
    consentSignature: {
      name,
      date: new Date(),
    },
  });

  await AuditLog.create({
    sessionId,
    action: 'Submitted HIPAA consent signature',
    details: `Signed by ${name}`,
  });

  res.json({ success: true });
});

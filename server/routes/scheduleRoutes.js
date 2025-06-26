const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const { protect } = require('../middleware/authMiddleware');
const AuditLog = require('../models/AuditLog');

// Before saving
const changes = {
  ...(status && { status }),
  ...(notes !== undefined && { notes }),
  ...(date && { date }),
  ...(icdCode && { icdCode }),
  ...(cptCode && { cptCode }),
  ...(hipaaConsent !== undefined && { hipaaConsent }),
};

// After session.save():
await AuditLog.create({
  sessionId: session._id,
  updatedBy: req.user._id,
  changes,
});
// GET session details
router.get('/:id', protect, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate('therapistId', 'name email')
      .populate('childId', 'name parentId');
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch session details' });
  }
});
router.get('/audit/:sessionId', protect, async (req, res) => {
  const logs = await AuditLog.find({ sessionId: req.params.sessionId }).sort({ timestamp: -1 });
  res.json(logs);
});

// PUT update session details
router.put('/update/:id', protect, async (req, res) => {
  const { status, notes, date, icdCode, cptCode, hipaaConsent } = req.body;

  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    if (status) session.status = status;
    if (notes !== undefined) session.notes = notes;
    if (date) session.date = new Date(date);
    if (icdCode) session.icdCode = icdCode;
    if (cptCode) session.cptCode = cptCode;
    if (hipaaConsent !== undefined) session.hipaaConsent = hipaaConsent;

    await session.save();
    res.json({ success: true, updated: session });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update session' });
  }
});

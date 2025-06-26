const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const { protect } = require('../middleware/authMiddleware');
const { generateSessionPDF } = require('../utils/sessionPdfExporter');

router.get('/export/:id', protect, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate('childId', 'name')
      .populate('therapistId', 'name');

    if (!session) return res.status(404).json({ message: 'Session not found' });

    const pdfBuffer = await generateSessionPDF(session);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=session_summary.pdf');
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

module.exports = router;

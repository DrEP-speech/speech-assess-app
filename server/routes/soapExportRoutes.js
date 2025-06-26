const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const { generateSOAPPdf } = require('../utils/soapPdfExporter');
const { protect } = require('../middleware/authMiddleware');

router.get('/pdf/:id', protect, async (req, res) => {
  const session = await Session.findById(req.params.id)
    .populate('childId', 'name')
    .populate('therapistId', 'name');

  if (!session || !session.aiSummary) return res.status(404).json({ error: 'No summary found' });

  const buffer = await generateSOAPPdf(session);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=soap_summary.pdf');
  res.send(buffer);
});

module.exports = router;

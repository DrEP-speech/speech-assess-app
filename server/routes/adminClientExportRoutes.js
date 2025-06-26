const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const Client = require('../models/Client');
const Therapist = require('../models/Therapist');
const { generateCSV, generatePDF, generateXLSX } = require('../utils/clientExportUtils');
if (type === 'xlsx') {
  const xlsxBuffer = await generateXLSX(clients);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment('assigned_clients.xlsx');
  return res.send(xlsxBuffer);
}

router.get('/assigned-clients/export', protect, adminOnly, async (req, res) => {
  try {
    const { therapistId, startDate, endDate, type } = req.query;

    const query = {
      assignedAt: { $exists: true },
    };

    if (therapistId) query.therapistId = therapistId;
    if (startDate || endDate) {
      query.assignedAt = {};
      if (startDate) query.assignedAt.$gte = new Date(startDate);
      if (endDate) query.assignedAt.$lte = new Date(endDate);
    }

    const clients = await Client.find(query)
      .populate('therapistId', 'name email')
      .sort({ assignedAt: -1 });

    if (type === 'csv') {
      const csv = generateCSV(clients);
      res.setHeader('Content-Type', 'text/csv');
      res.attachment('assigned_clients.csv');
      return res.send(csv);
    } else if (type === 'pdf') {
      const pdfBuffer = await generatePDF(clients);
      res.setHeader('Content-Type', 'application/pdf');
      res.attachment('assigned_clients.pdf');
      return res.send(pdfBuffer);
    }

    res.status(400).json({ message: 'Invalid export type' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Export failed' });
  }
});

module.exports = router;

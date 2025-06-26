const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const { protect } = require('../middleware/authMiddleware');
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/summary/:id', protect, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate('therapistId', 'name')
      .populate('childId', 'name');

    if (!session) return res.status(404).json({ error: 'Session not found' });

    const prompt = `
Generate a SOAP note for the following session:
- Child: ${session.childId.name}
- Therapist: ${session.therapistId.name}
- Date: ${new Date(session.date).toLocaleString()}
- Status: ${session.status}
- Notes: ${session.notes || 'N/A'}
- ICD Code: ${session.icdCode || 'N/A'}
- CPT Code: ${session.cptCode ||

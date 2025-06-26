const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');
const Session = require('../models/ScheduledSession');
require('dotenv').config();

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

router.post('/ai-summary/:id', async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    const prompt = `
Generate a clinical summary from the following:
- Notes: ${session.notes}
- SOAP: ${session.soap}
- Flags: ${session.flags?.join(', ') || 'None'}
- ICD: ${session.icdCode || 'N/A'}
- CPT: ${session.cptCode || 'N/A'}

Format:
• Summary of session
• Clinical impressions
• Next steps or recommendations
`;

    const response = await openai.createCompletion({
      model: 'gpt-4',
      prompt,
      max_tokens: 300,
      temperature: 0.7,
    });

    session.aiSummary = response.data.choices[0].text.trim();
    await session.save();
session.hasAuditWarning = await AuditLog.exists({
  sessionId: session._id,
  success: false
});

    res.json({ summary: session.aiSummary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI summary failed.' });
  }
});

module.exports = router;

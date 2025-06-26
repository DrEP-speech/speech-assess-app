const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Session = require('../models/ScheduledSession');

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your clinic's email
    pass: process.env.EMAIL_PASS
  }
});

// Trigger follow-up email
router.post('/:sessionId', async (req, res) => {
  try {
    const session = await Session.findById(req.params.sessionId);

    if (!session || session.followUpSent) {
      return res.status(400).json({ error: 'Session not found or already sent' });
    }

    const emailContent = `
      Hello ${session.name},

      Thank you for attending your recent ${session.type} therapy session on ${session.date} at ${session.time}.
      
      If you have any questions or would like to schedule your next session, please don't hesitate to reach out.

      Best regards,
      Your Therapy Team
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: session.email,
      subject: 'Follow-Up: Your Therapy Session',
      text: emailContent
    });

    session.followUpSent = true;
    await session.save();

    res.json({ message: 'Follow-up email sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send follow-up email.' });
  }
});

module.exports = router;

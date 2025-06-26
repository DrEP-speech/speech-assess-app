const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send', async (req, res) => {
  const { email, pdfBase64, fileName } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const buffer = Buffer.from(pdfBase64, 'base64');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Therapy Plan PDF',
    text: 'Attached is your custom speech therapy plan.',
    attachments: [
      {
        filename: fileName,
        content: buffer,
        contentType: 'application/pdf'
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;

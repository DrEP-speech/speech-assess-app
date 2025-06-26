const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendFollowUpEmail = async (session) => {
  const content = `
    Hello ${session.name},

    Thank you for attending your ${session.type} session on ${session.date}.

    Your therapist will follow up shortly with any additional notes or recommendations.

    — Therapy Team
  `;

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: session.email,
    subject: 'Thank you for attending your therapy session',
    text: content
  });
};

module.exports = sendFollowUpEmail;

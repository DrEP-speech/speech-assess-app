const logEmailFailure = require('./logEmailFailure');
const logEmailActivity = require('./logEmailActivity');
const EmailLog = require('../models/EmailLog');
const io = require('../socket'); // your socket instance

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error('Email error:', err);
    logEmailActivity({ to, subject, status: 'FAILURE', error: err });
  } else {
    console.log('Email sent:', info.response);
    logEmailActivity({ to, subject, status: 'SUCCESS' });
  }
});
transporter.sendMail(mailOptions, async (err, info) => {
  const log = {
    to,
    subject,
    status: err ? 'FAILURE' : 'SUCCESS',
    error: err ? err.message : undefined,
    therapistId: options?.therapistId || null,
  };

  await EmailLog.create(log);
  if (log.status === 'FAILURE') io.emit('emailFailure', log);
});
transporter.sendMail(mailOptions, async (err, info) => {
  const log = {
    to,
    subject,
    status: err ? 'FAILURE' : 'SUCCESS',
    error: err ? err.message : undefined,
    sessionId: options?.sessionId || null,
  };

  try {
    await EmailLog.create(log);
  } catch (logErr) {
    console.error('Failed to log email to DB:', logErr);
  }

  logEmailActivity(log); // still log to file
});
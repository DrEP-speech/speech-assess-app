const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/emailActivity.log');

function logEmailActivity({ to, subject, status, error = null }) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] TO: ${to} | SUBJECT: ${subject} | STATUS: ${status}${
    error ? ` | ERROR: ${error.message || error}` : ''
  }\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) console.error('Failed to write to email log:', err);
  });
}

module.exports = logEmailActivity;

const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/emailFailures.log');

function logEmailFailure({ to, subject, error }) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] TO: ${to} | SUBJECT: ${subject} | ERROR: ${error.message || error}\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Failed to write to email failure log:', err);
    }
  });
}

module.exports = logEmailFailure;

const cron = require('node-cron');
const Client = require('../models/Client');
const { generateCSV } = require('../utils/clientExportUtils');
const sendEmail = require('../utils/sendEmail'); // assumes nodemailer setup

function startAutoExportJob() {
  // Run daily at 7am
  cron.schedule('0 7 * * *', async () => {
    try {
      const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const clients = await Client.find({ assignedAt: { $gte: last24h } })
        .populate('therapistId', 'name email');

      if (clients.length === 0) return;

      const csv = generateCSV(clients);

      await sendEmail({
        to: 'admin@yourclinic.com',
        subject: 'Daily Assigned Clients Report',
        text: 'Attached is the daily export of newly assigned clients.',
        attachments: [
          {
            filename: 'assigned_clients.csv',
            content: csv,
          },
        ],
      });

      console.log('✅ Daily assignment export sent to admin');
    } catch (error) {
      console.error('❌ Failed daily assignment export:', error);
    }
  });
}

module.exports = { startAutoExportJob };

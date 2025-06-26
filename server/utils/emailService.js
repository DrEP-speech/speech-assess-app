const sendTherapistAssignmentEmail = async ({ to, clientName }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `🧑‍⚕️ New Client Assigned: ${clientName}`,
    text: `You’ve been assigned a new client: ${clientName}.\n\nLog in to view your dashboard.`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendAuditFlagAlert,
  sendTherapistAssignmentEmail,
};

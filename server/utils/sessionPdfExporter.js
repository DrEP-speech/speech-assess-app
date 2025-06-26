const PDFDocument = require('pdfkit');
const fs = require('fs');

async function generateSessionPDF(session) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];

    doc.fontSize(20).text('Session Summary Report', { align: 'center' }).moveDown();

    doc.fontSize(12).text(`Child: ${session.childId?.name}`);
    doc.text(`Therapist: ${session.therapistId?.name}`);
    doc.text(`Session Date: ${new Date(session.date).toLocaleString()}`);
    doc.text(`Status: ${session.status}`);
    doc.text(`Notes: ${session.notes || 'N/A'}`);
    doc.text(`ICD Code: ${session.icdCode || 'N/A'}`);
    doc.text(`CPT Code: ${session.cptCode || 'N/A'}`);
    doc.text(`HIPAA Consent: ${session.hipaaConsent ? 'Yes' : 'No'}`);
    doc.text(`Last Modified: ${session.updatedAt?.toLocaleString()}`);

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.end();
  });
}

module.exports = { generateSessionPDF };

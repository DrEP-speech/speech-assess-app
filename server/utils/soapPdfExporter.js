const PDFDocument = require('pdfkit');

async function generateSOAPPdf(session) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];

    doc.fontSize(18).text('SOAP Summary Report', { align: 'center' }).moveDown();
    doc.fontSize(12).text(`Child: ${session.childId?.name}`);
    doc.text(`Therapist: ${session.therapistId?.name}`);
    doc.text(`Date: ${new Date(session.date).toLocaleString()}`);
    doc.moveDown();

    doc.fontSize(12).text(session.aiSummary || 'No summary generated.');

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.end();
  });
}

module.exports = { generateSOAPPdf };

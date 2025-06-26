const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

// ✅ Embedded Base64 Logo (shortened here for readability)
const base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAADRpGNhQlgAANGkanVtYgAAAB5qdW1kYzJwYQARABCAAACqADibcQNjMnBhAAAANxNqdW1iAAAAR2p1bWRjMm1hABEAEIAAAKoAOJtxA3VybjpjMnBhOjEzMzE5ZjVlLWJlMmYtNDc2OC1hOWZhLWRmOThlYmQ0YWQ3MAAAAAHhanVtYgAAAClqdW1kYzJhcwARABCAAACqADibcQNjMnBhLmFzc2VydGlvbnMAAA...'; // Truncated for brevity

function generateCSV(clients) {
  const data = clients.map((client) => ({
    ClientName: client.name,
    Email: client.email,
    AssignedTherapist: client.therapistId?.name || 'Unassigned',
    TherapistEmail: client.therapistId?.email || '',
    AssignedAt: client.assignedAt?.toISOString() || '',
  }));

  const parser = new Parser();
  return parser.parse(data);
}

function generateUnassignedCSV(clients) {
  const unassigned = clients.filter((c) => !c.therapistId);
  const data = unassigned.map((client) => ({
    ClientName: client.name,
    Email: client.email,
    AssignedAt: client.assignedAt?.toISOString() || '',
  }));

  const parser = new Parser();
  return parser.parse(data);
}

function generateInactiveTherapistsReport(therapists) {
  const inactive = therapists.filter((t) => !t.isActive);
  const data = inactive.map((therapist) => ({
    TherapistName: therapist.name,
    Email: therapist.email,
    LastLogin: therapist.lastLogin ? new Date(therapist.lastLogin).toISOString() : 'Never',
  }));

  const parser = new Parser();
  return parser.parse(data);
}

function generatePDF(clients) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];

    // Decode base64 image
    const imageBuffer = Buffer.from(base64Logo.split(',')[1], 'base64');
    doc.image(imageBuffer, { width: 120, align: 'center' });

    doc.moveDown();
    doc.fontSize(18).fillColor('#1E40AF').text('Assigned Clients Export', { align: 'center' });
    doc.moveDown().fillColor('black');

    clients.forEach((client, index) => {
      doc.fontSize(12).text(`Client #${index + 1}`, { underline: true });
      doc.text(`Name: ${client.name}`);
      doc.text(`Email: ${client.email}`);
      doc.text(`Therapist: ${client.therapistId?.name || 'Unassigned'}`);
      doc.text(`Therapist Email: ${client.therapistId?.email || 'N/A'}`);
      doc.text(`Assigned At: ${client.assignedAt?.toLocaleString() || 'N/A'}`);
      doc.moveDown();
    });

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.end();
  });
}

async function generateXLSX(clients) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Assigned Clients');

  sheet.columns = [
    { header: 'Client Name', key: 'ClientName', width: 25 },
    { header: 'Email', key: 'Email', width: 30 },
    { header: 'Assigned Therapist', key: 'AssignedTherapist', width: 25 },
    { header: 'Therapist Email', key: 'TherapistEmail', width: 30 },
    { header: 'Assigned At', key: 'AssignedAt', width: 25 },
  ];

  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1E40AF' }, // dark blue
  };

  clients.forEach((client) => {
    sheet.addRow({
      ClientName: client.name,
      Email: client.email,
      AssignedTherapist: client.therapistId?.name || 'Unassigned',
      TherapistEmail: client.therapistId?.email || '',
      AssignedAt: client.assignedAt?.toISOString() || '',
    });
  });

  return await workbook.xlsx.writeBuffer();
}

module.exports = {
  generateCSV,
  generatePDF,
  generateXLSX,
  generateUnassignedCSV,
  generateInactiveTherapistsReport,
};


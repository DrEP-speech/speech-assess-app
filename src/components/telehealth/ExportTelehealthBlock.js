import React from 'react';
import jsPDF from 'jspdf';

const ExportTelehealthBlock = ({ session }) => {
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Telehealth Session Info', 10, 10);
    doc.text(`Session ID: ${session._id}`, 10, 20);
    doc.text(`Telehealth Link: ${session.telehealthLink || 'N/A'}`, 10, 30);
    doc.text(
      `Consent Signed: ${session.consentSignature?.name || 'Not signed'} on ${
        session.consentSignature?.date
          ? new Date(session.consentSignature.date).toLocaleString()
          : 'N/A'
      }`,
      10,
      40
    );
    doc.save('TelehealthInfo.pdf');
  };

  return (
    <button
      onClick={exportPDF}
      className="mt-3 px-4 py-2 bg-gray-700 text-white text-sm rounded hover:bg-gray-800"
    >
      📄 Export Telehealth Info (PDF)
    </button>
  );
};

export default ExportTelehealthBlock;

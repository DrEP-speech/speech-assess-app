import React from 'react';
import { jsPDF } from 'jspdf';

const ExportTelehealthBlock = ({ session }) => {
  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Telehealth Session Info', 10, 10);
    doc.setFontSize(11);
    doc.text(`Session ID: ${session._id}`, 10, 20);
    doc.text(`Client: ${session.clientName || 'N/A'}`, 10, 30);
    doc.text(`Telehealth Link: ${session.telehealthLink || 'None'}`, 10, 40);
    doc.text(`HIPAA Consent: ${session.hipaaConsent ? 'Given' : 'Not Recorded'}`, 10, 50);
    doc.save(`Telehealth_Session_${session._id}.pdf`);
  };

  return (
    <button
      onClick={handleExport}
      className="text-sm bg-gray-100 px-3 py-1 rounded border hover:bg-gray-200"
    >
      🖨️ Export Telehealth Info
    </button>
  );
};

export default ExportTelehealthBlock;

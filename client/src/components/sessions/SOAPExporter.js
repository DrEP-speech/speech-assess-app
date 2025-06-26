import React from 'react';
import jsPDF from 'jspdf';

const SOAPExporter = ({ session }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const now = new Date().toLocaleString();

    doc.setFontSize(14);
    doc.text('SOAP Therapy Session Report', 20, 20);
    doc.setFontSize(10);
    doc.text(`Date: ${now}`, 20, 30);
    doc.text(`Client: ${session.name}`, 20, 36);
    doc.text(`Session Type: ${session.type}`, 20, 42);
    doc.text(`Therapist: ${session.therapistId}`, 20, 48);

    doc.text('S (Subjective):', 20, 60);
    doc.text(session.notes?.subjective || 'N/A', 30, 66);

    doc.text('O (Objective):', 20, 78);
    doc.text(session.notes?.objective || 'N/A', 30, 84);

    doc.text('A (Assessment):', 20, 96);
    doc.text(session.notes?.assessment || 'N/A', 30, 102);

    doc.text('P (Plan):', 20, 114);
    doc.text(session.notes?.plan || 'N/A', 30, 120);

    doc.save(`SOAP_Report_${session.name}_${session.date}.pdf`);
  };

  return (
    <div className="mt-4">
      <button
        onClick={generatePDF}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        📄 Export SOAP Notes as PDF
      </button>
    </div>
  );
};

export default SOAPExporter;

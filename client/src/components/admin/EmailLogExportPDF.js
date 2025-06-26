import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EmailLogExportPDF = ({ logs }) => {
  const download = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Email Activity Log', 10, 10);

    const rows = logs.map(log => [
      log.to,
      log.subject,
      log.status,
      new Date(log.timestamp).toLocaleString(),
    ]);

    doc.autoTable({
      head: [['To', 'Subject', 'Status', 'Timestamp']],
      body: rows,
      startY: 20,
    });

    doc.save('email-activity-log.pdf');
  };

  return (
    <button
      onClick={download}
      className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
    >
      Export Logs as PDF
    </button>
  );
};

export default EmailLogExportPDF;

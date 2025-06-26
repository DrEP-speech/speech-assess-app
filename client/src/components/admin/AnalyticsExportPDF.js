import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AnalyticsExportPDF = ({ sessions }) => {
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Clinic Session Analytics Report', 10, 10);

    const rows = sessions.map((s) => [
      s.therapistName || 'Unassigned',
      s.clientName || 'Unknown',
      s.sessionType,
      new Date(s.date).toLocaleString(),
      s.status || 'pending',
    ]);

    doc.autoTable({
      startY: 20,
      head: [['Therapist', 'Client', 'Type', 'Date', 'Status']],
      body: rows,
    });

    doc.save('session_analytics_report.pdf');
  };

  return (
    <button
      onClick={exportPDF}
      className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
    >
      Export Analytics as PDF
    </button>
  );
};

export default AnalyticsExportPDF;

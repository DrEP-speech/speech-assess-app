import React from 'react';
import jsPDF from 'jspdf';
import Papa from 'papaparse';

const ExportFlaggedSessions = ({ flaggedSessions }) => {
  const exportCSV = () => {
    const csv = Papa.unparse(flaggedSessions.map(s => ({
      SessionID: s._id,
      Client: s.clientId?.name || 'Unknown',
      Date: new Date(s.date).toLocaleDateString(),
      Status: s.status,
      Notes: s.notes || '',
    })));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FlaggedSessions.csv';
    a.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Flagged Sessions', 10, 10);
    flaggedSessions.forEach((s, idx) => {
      doc.text(
        `${idx + 1}. ${s._id} - ${s.clientId?.name || 'Client'} - ${new Date(
          s.date
        ).toLocaleDateString()} - ${s.status}`,
        10,
        20 + idx * 10
      );
    });
    doc.save('FlaggedSessions.pdf');
  };

  return (
    <div className="flex space-x-2">
      <button onClick={exportCSV} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
        ⬇️ Export CSV
      </button>
      <button onClick={exportPDF} className="px-3 py-1 bg-red-600 text-white rounded text-sm">
        📄 Export PDF
      </button>
    </div>
  );
};

export default ExportFlaggedSessions;

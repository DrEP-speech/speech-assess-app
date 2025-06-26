import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const GrowthGraphExport = ({ progressData }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Speech Therapy Progress Report', 20, 20);

    const tableRows = progressData.map((entry) => [
      entry.date,
      entry.fluency,
      entry.grammar,
      entry.clarity
    ]);

    autoTable(doc, {
      head: [['Date', 'Fluency', 'Grammar', 'Clarity']],
      body: tableRows,
      startY: 30
    });

    doc.save('progress_report.pdf');
  };

  return (
    <div className="mt-4">
      <button
        onClick={exportToPDF}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        📄 Export Progress to PDF
      </button>
    </div>
  );
};

export default GrowthGraphExport;

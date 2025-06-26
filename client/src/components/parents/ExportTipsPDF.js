import React from 'react';
import jsPDF from 'jspdf';

const ExportTipsPDF = ({ tips }) => {
  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Speech Tips for Home', 14, 20);

    doc.setFontSize(12);
    tips.forEach((tip, index) => {
      doc.text(`• ${tip}`, 14, 30 + index * 10);
    });

    doc.save('SpeechTips.pdf');
  };

  return (
    <button
      onClick={handleExport}
      className="mt-2 text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
    >
      ⬇️ Download Tips PDF
    </button>
  );
};

export default ExportTipsPDF;

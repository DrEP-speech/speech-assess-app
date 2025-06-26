// 📁 client/src/components/session/DownloadAISummaryButton.js
import React from 'react';
import jsPDF from 'jspdf';

const DownloadAISummaryButton = ({ session }) => {
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Session Summary for: ${session.clientName}`, 10, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date(session.date).toLocaleDateString()}`, 10, 30);
    doc.text('AI-Generated Summary:', 10, 45);
    doc.setFontSize(11);
    doc.text(doc.splitTextToSize(session.aiSummary || 'No summary available.', 180), 10, 55);
    doc.save(`AI_Summary_${session.clientName}.pdf`);
  };

  return (
    <button className="btn btn-outline-primary mt-2" onClick={handleDownload}>
      📥 Download AI Summary as PDF
    </button>
  );
};

export default DownloadAISummaryButton;

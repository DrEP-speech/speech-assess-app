import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExportProgressPDF = ({ child }) => {
  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Progress Report for ${child.name}`, 14, 20);

    doc.setFontSize(12);
    doc.text(`Last Updated: ${new Date(child.progressUpdatedAt).toLocaleDateString()}`, 14, 30);

    doc.setFontSize(11);
    doc.text('Progress Summary:', 14, 45);
    doc.text(doc.splitTextToSize(child.progressSummary || 'No summary available.', 180), 14, 55);

    doc.save(`ProgressReport-${child.name}.pdf`);
  };

  return (
    <button
      onClick={handleExport}
      className="mt-2

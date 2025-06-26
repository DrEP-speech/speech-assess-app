// SessionExportPDF.js
import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SessionExportPDF = ({ session }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Speech Therapy Session Summary', 10, 10);
    doc.setFontSize(12);

    let y = 20;

    const writeLine = (label, value) => {
      doc.setFont(undefined, 'bold');
      doc.text(`${label}:`, 10, y);
      doc.setFont(undefined, 'normal');
      doc.text(value || 'N/A', 50, y);
      y += 8;
    };

    writeLine('Session ID', session._id);
    writeLine('Date', new Date(session.date).toLocaleString());
    writeLine('Therapist', session.therapistName);
    writeLine('Client', session.clientName);
    writeLine('Session Type', session.sessionType);
    writeLine('Duration', `${session.duration || 'N/A'} minutes`);
    writeLine('Status', session.status || 'Not marked');
    writeLine('ICD Codes', session.icdCodes?.join(', ') || 'N/A');
    writeLine('CPT Codes', session.cptCodes?.join(', ') || 'N/A');
    writeLine('Tags', session.manualFlags?.join(', ') || 'None');

    if (session.hipaaConsentSigned) {
      doc.setTextColor(0, 150, 0);
      doc.text('✔ HIPAA Consent Signed', 10, y);
    } else {
      doc.setTextColor(200, 0, 0);
      doc.text('✖ HIPAA Consent Not Signed', 10, y);
    }

    doc.setTextColor(0, 0, 0);
    y += 12;

    if (session.notes) {
      doc.setFontSize(14);
      doc.text('Therapist Notes:', 10, y);
      y += 8;
      doc.setFontSize(12);
      doc.text(doc.splitTextToSize(session.notes, 180), 10, y);
      y += doc.getTextDimensions(session.notes).h + 8;
    }

    if (session.aiSummary) {
      doc.setFontSize(14);
      doc.text('AI-Generated Summary:', 10, y);
      y += 8;
      doc.setFontSize(12);
      const splitSummary = doc.splitTextToSize(session.aiSummary, 180);
      doc.text(splitSummary, 10, y);
      y += splitSummary.length * 6 + 4;
    }

    // Optional Audit Section
    if (session.auditLog?.length > 0) {
      doc.addPage();
      doc.setFontSize(14);
      doc.text('Session Audit Trail', 10, 10);
      doc.setFontSize(10);

      const auditRows = session.auditLog.map(entry => [
        new Date(entry.timestamp).toLocaleString(),
        entry.action,
        entry.performedBy,
      ]);

      doc.autoTable({
        startY: 15,
        head: [['Time', 'Action', 'By']],
        body: auditRows,
      });
    }

    doc.save(`Session_${session._id}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Download Session PDF
    </button>
  );
};

export default SessionExportPDF;

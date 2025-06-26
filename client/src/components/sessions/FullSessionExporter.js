import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const FullSessionExporter = ({ session, auditTrail, icdCptCodes, hipaaSignedName, timerDuration }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const now = new Date().toLocaleString();

    doc.setFontSize(14);
    doc.text('🩺 Full Session Report', 20, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${now}`, 20, 28);

    doc.autoTable({
      head: [['Field', 'Value']],
      body: [
        ['Client', session.name],
        ['Therapist', session.therapistId],
        ['Session Type', session.type],
        ['Date', session.date],
        ['Time', session.time],
        ['Duration', timerDuration || 'Not recorded'],
        ['HIPAA Consent Signed By', hipaaSignedName || 'Pending']
      ],
      startY: 34
    });

    doc.text('ICD-10 / CPT Codes:', 20, doc.autoTable.previous.finalY + 10);
    if (icdCptCodes.length > 0) {
      icdCptCodes.forEach((code, i) => {
        doc.text(`- ${code}`, 25, doc.autoTable.previous.finalY + 18 + i * 6);
      });
    } else {
      doc.text('None selected', 25, doc.autoTable.previous.finalY + 18);
    }

    if (session.notes) {
      doc.text('Therapist Notes:', 20, doc.autoTable.previous.finalY + 40);
      doc.setFontSize(9);
      doc.text(session.notes, 25, doc.autoTable.previous.finalY + 46);
    }

    doc.setFontSize(10);
    doc.text('Audit Trail:', 20, doc.autoTable.previous.finalY + 66);
    auditTrail.forEach((log, i) => {
      const y = doc.autoTable.previous.finalY + 74 + i * 6;
      doc.text(`${log.timestamp} – ${log.user}: ${log.action}`, 25, y);
    });

    doc.save(`Session_Report_${session.name}_${session.date}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="mt-4 bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800"
    >
      📄 Download Full Session PDF
    </button>
  );
};

export default FullSessionExporter;

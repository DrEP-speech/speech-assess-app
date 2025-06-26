import jsPDF from "jspdf";
import "jspdf-autotable";

const BatchPDFExporter = ({ sessions }) => {
  const exportAll = () => {
    const doc = new jsPDF();
    sessions.forEach((sesh, idx) => {
      doc.setFontSize(14);
      doc.text(`Session ${idx + 1}`, 10, 10 + idx * 80);
      doc.setFontSize(12);
      doc.text(`Date: ${sesh.date}`, 10, 20 + idx * 80);
      doc.text(`Therapist: ${sesh.therapistName}`, 10, 30 + idx * 80);
      doc.text("AI Summary:", 10, 40 + idx * 80);
      doc.text(sesh.aiSummary || "N/A", 10, 50 + idx * 80, { maxWidth: 180 });

      if (idx < sessions.length - 1) doc.addPage();
    });
    doc.save("batch-session-export.pdf");
  };

  return (
    <button
      onClick={exportAll}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Export Selected Sessions (PDF)
    </button>
  );
};

export default BatchPDFExporter;

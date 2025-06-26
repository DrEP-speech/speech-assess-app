import React, { useState } from 'react';
import jsPDF from 'jspdf';

const SOAPNoteEditor = () => {
  const [note, setNote] = useState({
    subjective: '', objective: '', assessment: '', plan: ''
  });

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('SOAP Note', 20, 20);
    doc.text(`S: ${note.subjective}`, 20, 40);
    doc.text(`O: ${note.objective}`, 20, 60);
    doc.text(`A: ${note.assessment}`, 20, 80);
    doc.text(`P: ${note.plan}`, 20, 100);
    doc.save('soap_note.pdf');
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">📝 SOAP Note Editor</h2>
      <textarea placeholder="Subjective" className="w-full border p-2 mb-2" onChange={(e) => setNote({ ...note, subjective: e.target.value })} />
      <textarea placeholder="Objective" className="w-full border p-2 mb-2" onChange={(e) => setNote({ ...note, objective: e.target.value })} />
      <textarea placeholder="Assessment" className="w-full border p-2 mb-2" onChange={(e) => setNote({ ...note, assessment: e.target.value })} />
      <textarea placeholder="Plan" className="w-full border p-2 mb-2" onChange={(e) => setNote({ ...note, plan: e.target.value })} />
      <button onClick={exportPDF} className="bg-green-600 text-white px-4 py-2 rounded">Export as PDF</button>
    </div>
  );
};

export default SOAPNoteEditor;

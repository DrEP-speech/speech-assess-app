import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';

const GrammarResultExport = ({ result }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Grammar & Fluency Report', 20, 20);
    autoTable(doc, {
      head: [['Fluency Score', 'Errors', 'Suggestions']],
      body: [[
        result.fluencyScore,
        result.errors.join(', '),
        result.suggestions.join(', ')
      ]],
      startY: 30
    });
    return doc;
  };

  const handleDownload = () => {
    const doc = generatePDF();
    doc.save('grammar_report.pdf');
  };

  const handleEmail = async () => {
    const doc = generatePDF();
    const pdfBase64 = btoa(doc.output('bloburi').split(',')[1]);

    try {
      await axios.post('http://localhost:5000/api/email/send', {
        email,
        pdfBase64,
        fileName: 'grammar_report.pdf'
      });
      setStatus('✅ Email sent!');
    } catch (err) {
      console.error(err);
      setStatus('❌ Email failed');
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <button onClick={handleDownload} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
        📄 Download PDF
      </button>

      <div className="space-y-2">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          onClick={handleEmail}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          📧 Email Report
        </button>
        {status && <p className="text-sm text-gray-600">{status}</p>}
      </div>
    </div>
  );
};

export default GrammarResultExport;

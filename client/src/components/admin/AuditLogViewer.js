import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const AuditLogViewer = ({ sessionId }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (sessionId) {
      axios.get(`/api/audit/session/${sessionId}`).then(res => setLogs(res.data));
    }
  }, [sessionId]);

  const exportAuditPDF = () => {
    const doc = new jsPDF();
    doc.text('Audit Trail - Session Activity', 10, 10);

    logs.forEach((log, idx) => {
      doc.text(
        `${idx + 1}. ${log.timestamp} | ${log.action} | ${log.details || ''}`,
        10,
        20 + idx * 10
      );
    });

    doc.save('SessionAuditTrail.pdf');
  };

  if (!logs.length) return null;

  return (
    <div className="bg-white p-4 rounded shadow-sm mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">📜 Audit Trail</h3>

      <ul className="text-sm space-y-1">
        {logs.map((log) => (
          <li key={log._id}>
            <strong>{new Date(log.timestamp).toLocaleString()}</strong> – {log.action}
            {log.details && <span className="text-gray-600">: {log.details}</span>}
          </li>
        ))}
      </ul>

      <button
        onClick={exportAuditPDF}
        className="mt-3 px-4 py-1 bg-gray-700 text-white rounded text-sm hover:bg-gray-800"
      >
        📄 Export Audit Trail (PDF)
      </button>
    </div>
  );
};

export default AuditLogViewer;

import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const SessionPrintView = ({ session }) => {
  const printRef = useRef();
  const handlePrint = useReactToPrint({ content: () => printRef.current });

  return (
    <div className="my-4">
      <button
        onClick={handlePrint}
        className="bg-blue-700 text-white text-sm px-3 py-1 rounded mb-3"
      >
        🖨️ Print Session
      </button>
{session.aiSummary && (
  <section className="mt-4">
    <h3 className="font-bold text-md mb-1">🧠 AI Session Summary</h3>
    <p className="text-gray-700 whitespace-pre-line">{session.aiSummary}</p>
  </section>
)}
      <div ref={printRef} className="border p-4 rounded bg-white shadow text-sm">
        <h2 className="text-xl font-bold mb-3">📋 Session Summary</h2>

        <p><strong>👤 Client:</strong> {session.name}</p>
        <p><strong>📆 Date:</strong> {session.date} at {session.time}</p>
        <p><strong>🧪 Type:</strong> {session.type}</p>

        <hr className="my-3" />

        <p><strong>📝 Notes:</strong></p>
        <p className="whitespace-pre-wrap">{session.notes || '—'}</p>

        <p className="mt-3"><strong>💬 SOAP Comments:</strong></p>
        <p className="whitespace-pre-wrap">{session.soap || '—'}</p>

        <p className="mt-3"><strong>🧷 Flags:</strong> {session.flags?.join(', ') || 'None'}</p>
        <p><strong>🏷️ ICD Code:</strong> {session.icdCode || '—'}</p>
        <p><strong>🏷️ CPT Code:</strong> {session.cptCode || '—'}</p>
      </div>
    </div>
  );
};

export default SessionPrintView;

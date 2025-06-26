import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAuditLogsModal = ({ sessionId, onClose }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (sessionId) {
      axios.get(`/api/audit/session/${sessionId}`).then(res => setLogs(res.data));
    }
  }, [sessionId]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-3/4 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">📝 Audit Logs</h2>
        <button onClick={onClose} className="absolute top-4 right-6 text-gray-600 text-xl">×</button>
        <ul className="text-sm space-y-2">
          {logs.map(log => (
            <li key={log._id}>
              <strong>{new Date(log.timestamp).toLocaleString()}</strong> — {log.action}
              {log.details && <span className="text-gray-600">: {log.details}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewAuditLogsModal;

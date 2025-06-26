import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuditLogViewer = ({ sessionId }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!sessionId) return;
    axios.get(`/api/schedule/audit/${sessionId}`).then((res) => {
      setLogs(res.data);
    });
  }, [sessionId]);

  if (!logs.length) return <p className="text-sm text-gray-500">No audit logs found.</p>;

  return (
    <div className="bg-gray-50 border rounded p-3 space-y-2 text-sm max-h-48 overflow-y-auto">
      <h4 className="font-medium text-gray-700">Audit Trail</h4>
      {logs.map((log, i) => (
        <div key={i} className="border-b pb-1">
          <p><strong>{new Date(log.timestamp).toLocaleString()}:</strong></p>
          <ul className="ml-4 list-disc">
            {Object.entries(log.changes).map(([key, value]) => (
              <li key={key}><span className="text-gray-700">{key}</span>: <span className="text-gray-900">{String(value)}</span></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AuditLogViewer;

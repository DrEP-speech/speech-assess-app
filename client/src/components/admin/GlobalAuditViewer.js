import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GlobalAuditViewer = () => {
  const [logs, setLogs] = useState([]);
  const [therapistId, setTherapistId] = useState('');
  const [date, setDate] = useState('');

  const fetchLogs = async () => {
    const res = await axios.get('/api/audit/global', {
      params: { therapistId, date },
    });
    setLogs(res.data);
  };

  useEffect(() => {
    fetchLogs();
  }, [therapistId, date]);

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-semibold mb-2">📊 Global Audit Viewer</h2>
      <div className="flex space-x-4 mb-3">
        <input
          type="text"
          placeholder="Therapist ID"
          className="border p-2 rounded text-sm"
          value={therapistId}
          onChange={(e) => setTherapistId(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded text-sm"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <ul className="text-sm space-y-1 max-h-96 overflow-y-auto">
        {logs.map((log) => (
          <li key={log._id}>
            <strong>{new Date(log.timestamp).toLocaleString()}</strong> –{' '}
            {log.action} ({log.sessionId?.slice(-6)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GlobalAuditViewer;

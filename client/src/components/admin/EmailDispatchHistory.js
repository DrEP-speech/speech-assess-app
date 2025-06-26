import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmailDispatchHistory = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('/api/analytics/email-failures')
      .then((res) => setLogs(res.data))
      .catch((err) => console.error('Failed to load email logs:', err));
  }, []);

  return (
    <div className="bg-white p-6 mt-6 rounded shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Email Dispatch Failures</h2>

      {logs.length === 0 ? (
        <p className="text-gray-600">No email failures logged.</p>
      ) : (
        <ul className="text-sm text-gray-700 max-h-64 overflow-y-auto space-y-2">
          {logs.map((line, idx) => (
            <li key={idx} className="border-b py-1">{line}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmailDispatchHistory;

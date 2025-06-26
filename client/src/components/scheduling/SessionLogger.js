import React, { useState } from 'react';
import axios from 'axios';

const SessionLogger = ({ sessionId }) => {
  const [duration, setDuration] = useState('');
  const [attended, setAttended] = useState(false);
  const [status, setStatus] = useState('');

  const handleLog = async () => {
    try {
      await axios.put(`/api/schedule/log/${sessionId}`, {
        duration,
        attended
      });
      setStatus('✅ Session logged!');
    } catch (err) {
      setStatus('❌ Failed to log session');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-6">
      <h3 className="font-bold mb-2">📑 Log Session</h3>
      <input
        type="text"
        placeholder="Duration (e.g., 45 min)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <label className="flex items-center space-x-2 mb-2">
        <input
          type="checkbox"
          checked={attended}
          onChange={() => setAttended(!attended)}
        />
        <span>Attended</span>
      </label>
      <button
        onClick={handleLog}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Log Session
      </button>
      {status && <p className="text-sm mt-2 text-gray-600">{status}</p>}
    </div>
  );
};

export default SessionLogger;

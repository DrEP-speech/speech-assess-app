import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmailLogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [filterTherapist, setFilterTherapist] = useState('');

  const fetchLogs = async () => {
    const url = filterTherapist
      ? `/api/analytics/email-logs?therapistId=${filterTherapist}`
      : '/api/analytics/email-logs';
    const res = await axios.get(url);
    setLogs(res.data);
  };

  useEffect(() => {
    axios.get('/api/users/therapists').then((res) => setTherapists(res.data));
    fetchLogs();
  }, [filterTherapist]);

  return (
    <div className="bg-white p-6 mt-6 rounded shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Email Activity Log</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Filter by Therapist:</label>
        <select
          className="p-2 border rounded w-full"
          value={filterTherapist}
          onChange={(e) => setFilterTherapist(e.target.value)}
        >
          <option value="">All Therapists</option>
          {therapists.map((t) => (
            <option key={t._id} value={t._id}>{t.name}</option>
          ))}
        </select>
      </div>

      {/* table rendering remains unchanged */}

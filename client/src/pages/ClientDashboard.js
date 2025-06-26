import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientDashboard = ({ currentUser }) => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get('/api/schedule/client').then((res) => {
      setSessions(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {currentUser?.name}</h1>

      <h2 className="text-lg font-semibold mb-2">Upcoming Sessions</h2>
      <ul className="space-y-2">
        {sessions.map((s) => (
          <li key={s._id} className="border p-4 rounded shadow-sm">
            <div>{s.sessionType} with {s.therapistName}</div>
            <div className="text-sm text-gray-600">{new Date(s.date).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientDashboard;

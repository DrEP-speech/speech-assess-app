import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ViewScheduledSessions = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(`/api/schedule/user/${user.userId}`);
      setSessions(data);
    };
    fetch();
  }, [user]);

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">📆 My Scheduled Sessions</h2>
      {sessions.length === 0 ? (
        <p>No sessions scheduled yet.</p>
      ) : (
        <ul className="space-y-3">
          {sessions.map((s) => (
            <li key={s._id} className="border p-3 rounded">
              {s.date} at {s.time} — <strong>{s.type}</strong><br />
              <span className="text-sm text-gray-600">Confirmation: {s.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewScheduledSessions;

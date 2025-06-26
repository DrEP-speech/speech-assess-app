import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TherapistSessionNavigator = ({ therapistId }) => {
  const [sessions, setSessions] = useState([]);
  const [filter, setFilter] = useState('upcoming');

  useEffect(() => {
    const fetchSessions = async () => {
      const { data } = await axios.get(`/api/schedule/therapist/${therapistId}`);
      setSessions(data);
    };
    fetchSessions();
  }, [therapistId]);

  const now = new Date();

  const filteredSessions = sessions.filter((s) => {
    const sessionDate = new Date(s.date);
    if (filter === 'upcoming') return sessionDate >= now;
    if (filter === 'past') return sessionDate < now;
    return true;
  });

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">📅 Scheduled Sessions</h2>

      <div className="mb-4 flex gap-2">
        <button
          className={`px-3 py-1 rounded ${filter === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`px-3 py-1 rounded ${filter === 'past' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('past')}
        >
          Past
        </button>
        <button
          className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
      </div>

      <ul className="divide-y divide-gray-200">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((s) => (
            <li key={s._id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {s.name} – {s.date} at {s.time}
                  {s.attended && (
                    <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      ✅ Completed
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500">Type: {s.type}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/session/${s._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Open
                </Link>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No sessions found.</p>
        )}
      </ul>
    </div>
  );
};

export default TherapistSessionNavigator;


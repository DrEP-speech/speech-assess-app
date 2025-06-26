import React from 'react';

const UpcomingSessionList = ({ sessions }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Upcoming Sessions</h2>
      {sessions.length === 0 ? (
        <p className="text-sm text-gray-500">No sessions scheduled yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200 text-sm">
          {sessions.map((s) => (
            <li key={s._id} className="py-2">
              {new Date(s.date).toLocaleString()} – {s.therapistName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingSessionList;

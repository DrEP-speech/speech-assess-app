import React from 'react';

const TherapistProgressSnapshot = ({ snapshot }) => {
  if (!snapshot) return <div className="text-gray-500">Loading progress snapshot...</div>;

  return (
    <div className="p-4 rounded-xl shadow bg-white border">
      <h2 className="text-xl font-semibold mb-3">Progress Snapshot</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-lg font-bold text-blue-700">{snapshot.totalClients}</p>
          <p className="text-sm text-gray-600">Clients Assigned</p>
        </div>
        <div>
          <p className="text-lg font-bold text-green-700">{snapshot.sessionsThisWeek}</p>
          <p className="text-sm text-gray-600">Sessions This Week</p>
        </div>
        <div>
          <p className="text-lg font-bold text-yellow-700">{snapshot.completedSessions}</p>
          <p className="text-sm text-gray-600">Sessions Completed</p>
        </div>
        <div>
          <p className="text-lg font-bold text-red-600">{snapshot.noShows}</p>
          <p className="text-sm text-gray-600">No Shows</p>
        </div>
      </div>
    </div>
  );
};

export default TherapistProgressSnapshot;

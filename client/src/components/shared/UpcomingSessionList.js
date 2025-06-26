import React, { useState } from 'react';
import AttendanceEditorModal from '../sessions/AttendanceEditorModal';
import SessionStatusBadge from '../sessions/SessionStatusBadge';

const UpcomingSessionList = ({ sessions }) => {
  const [modalSessionId, setModalSessionId] = useState(null);

  if (!sessions || sessions.length === 0) {
    return <p className="text-gray-500">No upcoming sessions.</p>;
  }

  return (
    <div className="bg-white p-4 border rounded-xl shadow mt-4">
      <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
      <ul className="space-y-4">
        {sessions.map((session, index) => (
          <li
            key={index}
            className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4"
          >
            <div>
              <p className="text-md font-medium">
                {session.childName} with {session.therapistName}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(session.dateTime).toLocaleString()}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {session.isTelehealth && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    Telehealth
                  </span>
                )}
                <SessionStatusBadge status={session.status || 'scheduled'} />
              </div>
            </div>

            <div className="mt-2 md:mt-0">
              <button
                className="text-xs text-blue-600 underline"
                onClick={() => setModalSessionId(session._id)}
              >
                Mark Attendance
              </button>
            </div>
          </li>
        ))}
      </ul>

      <AttendanceEditorModal
        isOpen={!!modalSessionId}
        sessionId={modalSessionId}
        onClose={() => setModalSessionId(null)}
        onStatusUpdated={(newStatus) => {
          // You can trigger a session refresh here if needed
        }}
      />
    </div>
  );
};

export default UpcomingSessionList;

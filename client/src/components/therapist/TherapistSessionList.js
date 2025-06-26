import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TelehealthStatusBadge from '../sessions/TelehealthStatusBadge';
import ConsentReminderModal from '../telehealth/ConsentReminderModal';
import { logConsentReminderView } from '../../utils/logConsentReminder';

const TherapistSessionList = ({ currentUser }) => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [filterToday, setFilterToday] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get('/api/schedule/therapist');
        setSessions(res.data);
        setFilteredSessions(res.data);
      } catch (err) {
        console.error('Error fetching sessions:', err);
      }
    };

    fetchSessions();
  }, []);

  useEffect(() => {
    if (filterToday) {
      const today = new Date().toDateString();
      const filtered = sessions.filter((session) => {
        const sessionDate = new Date(session.date).toDateString();
        return sessionDate === today;
      });
      setFilteredSessions(filtered);
    } else {
      setFilteredSessions(sessions);
    }
  }, [filterToday, sessions]);

  const handleStartSession = async (session) => {
    if (!session.hipaaConsent) {
      setSelectedSession(session);
      setShowConsentModal(true);
      await logConsentReminderView(session._id, currentUser.id);
    } else {
      window.open(session.telehealthLink || '/', '_blank');
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">📅 Upcoming Sessions</h2>

      <div className="mb-4">
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={filterToday}
            onChange={() => setFilterToday(!filterToday)}
          />
          <span className="text-sm text-gray-700">Show only today’s sessions</span>
        </label>
      </div>

      {filteredSessions.length === 0 ? (
        <p className="text-sm text-gray-500">No sessions found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filteredSessions.map((session) => (
            <li key={session._id} className="py-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{session.clientName || 'Unnamed Client'}</div>
                <div className="text-xs text-gray-600">
                  {new Date(session.date).toLocaleDateString()} @ {session.time}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <TelehealthStatusBadge session={session} />
                <button
                  onClick={() => handleStartSession(session)}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  ▶️ Start Session
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConsentReminderModal
        isOpen={showConsentModal}
        onClose={() => setShowConsentModal(false)}
        session={selectedSession}
      />
    </div>
  );
};

export default TherapistSessionList;

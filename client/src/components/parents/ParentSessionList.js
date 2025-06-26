import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TelehealthStatusBadge from '../sessions/TelehealthStatusBadge';
import ConsentReminderModal from '../telehealth/ConsentReminderModal';
import { logConsentReminderView } from '../../utils/logConsentReminder';

const ParentSessionList = ({ currentUser }) => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [filterToday, setFilterToday] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get('/api/schedule/parent');
        setSessions(res.data);
        setFilteredSessions(res.data);
      } catch (err) {
        console.error('Error fetching parent sessions:', err);
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

  const handleJoinSession = async (session) => {
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
      <h2 className="text-xl font-semibold mb-4">👪 Your Child’s Upcoming Sessions</h2>

      <div className="mb-4">
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={filterToday}
            onChange={() => setFilterToday(!filterToday)}
          />
          <span className="text-sm text-gray-700">Show only today

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

const TherapistCalendarNavigator = ({ therapistId }) => {
  const [sessions, setSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      const { data } = await axios.get(`/api/schedule/therapist/${therapistId}`);
      setSessions(data);
    };
    fetchSessions();
  }, [therapistId]);

  const getSessionsForDate = (date) =>
    sessions.filter((s) => new Date(s.date).toDateString() === date.toDateString());

  const tileContent = ({ date }) => {
    const daySessions = getSessionsForDate(date);
    return daySessions.length > 0 ? (
      <div className="bg-green-300 rounded-full w-2 h-2 mx-auto mt-1" />
    ) : null;
  };

  const sessionList = getSessionsForDate(selectedDate);

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">📆 Session Calendar</h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={tileContent}
      />
      <div className="mt-4">
        {sessionList.length > 0 ? (
          <ul className="space-y-2">
            {sessionList.map((s) => (
              <li key={s._id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span>{s.name} @ {s.time}</span>
                <button
                  onClick={() => navigate(`/session/${s._id}`)}
                  className="text-blue-600 hover:underline"
                >
                  Open
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 mt-2">No sessions for this date.</p>
        )}
      </div>
    </div>
  );
};

export default TherapistCalendarNavigator;

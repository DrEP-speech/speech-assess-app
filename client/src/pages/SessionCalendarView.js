import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar'; // must be installed via npm
import 'react-calendar/dist/Calendar.css';

const SessionCalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get('/api/schedule/all').then((res) => {
      setSessions(res.data);
    });
  }, []);

  const filtered = sessions.filter((s) =>
    new Date(s.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Session Calendar</h1>
      <Calendar value={selectedDate} onChange={setSelectedDate} />

      <h2 className="mt-4 font-bold">Sessions on {selectedDate.toDateString()}</h2>
      <ul className="space-y-2 mt-2">
        {filtered.map((s) => (
          <li key={s._id} className="border p-3 rounded shadow-sm">
            <div>{s.clientName} – {s.sessionType}</div>
            <div className="text-sm text-gray-500">{new Date(s.date).toLocaleTimeString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionCalendarView;

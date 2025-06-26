import React, { useState } from 'react';
import axios from 'axios';

const ParentCheckInScheduler = ({ childId }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const scheduleCheckIn = async () => {
    try {
      await axios.post('/api/schedule/parent-checkin', {
        childId,
        date,
        time,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Error scheduling check-in', err);
    }
  };

  return (
    <div className="bg-white border rounded p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">📅 Schedule Parent Check-In</h3>
      {submitted ? (
        <p className="text-green-700 text-sm">Check-in scheduled successfully!</p>
      ) : (
        <div className="space-y-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-2 py-1 rounded text-sm"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border px-2 py-1 rounded text-sm"
          />
          <button
            onClick={scheduleCheckIn}
            className="bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-700"
          >
            Schedule
          </button>
        </div>
      )}
    </div>
  );
};

export default ParentCheckInScheduler;

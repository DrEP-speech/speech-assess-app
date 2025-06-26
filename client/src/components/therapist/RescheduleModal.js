import React, { useState } from 'react';
import axios from 'axios';

const RescheduleModal = ({ session, onClose, onReschedule }) => {
  const [newDate, setNewDate] = useState(session.date);
  const [newTime, setNewTime] = useState(session.time);

  const handleSubmit = async () => {
    const updated = await axios.put(`/api/schedule/${session._id}`, {
      date: newDate,
      time: newTime
    });
    onReschedule(updated.data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h3 className="text-lg font-semibold mb-4">🕓 Reschedule Session</h3>
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RescheduleModal;

import React, { useState } from 'react';

const RescheduleModal = ({ isOpen, onClose, session, onReschedule }) => {
  const [newDate, setNewDate] = useState(session?.date || '');
  const [newTime, setNewTime] = useState(session?.time || '');

  const handleReschedule = () => {
    onReschedule({ ...session, date: newDate, time: newTime });
    onClose();
  };

  if (!isOpen || !session) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center">
        <h2 className="text-xl font-bold mb-4">⏳ Reschedule Session</h2>
        <input
          type="date"
          className="border p-2 w-full mb-2"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <input
          type="time"
          className="border p-2 w-full mb-4"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
        <button
          onClick={handleReschedule}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
        >
          Confirm
        </button>
        <button
          onClick={onClose}
          className="text-red-600 font-semibold hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RescheduleModal;

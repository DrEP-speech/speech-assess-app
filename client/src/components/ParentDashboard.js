import React from 'react';
import { Link } from 'react-router-dom';

const ParentDashboard = () => {
  return (
    <div className="p-6 space-y-4 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold">👨‍👩‍👧 Parent Dashboard</h2>
      <ul className="space-y-3">
        <li><Link to="/grammar-check" className="text-blue-600 underline">✍️ Practice Grammar</Link></li>
        <li><Link to="/vocal-coach" className="text-blue-600 underline">🎤 Voice Practice</Link></li>
        <li><Link to="/therapy-plan" className="text-blue-600 underline">📥 View Therapy Plan</Link></li>
        <li><Link to="/teletherapy" className="text-blue-600 underline">📞 Join Teletherapy Session</Link></li>
      </ul>
    </div>
  );
};
{parentCheckIn && (
  <ReminderQueue
    checkInTime={parentCheckIn.time}
    onReminderTriggered={() => {
      toast.info("Reminder: Your parent check-in session is starting.");
    }}
  />
)}


export default ParentDashboard;

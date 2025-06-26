import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import SessionConfirmationModal from './SessionConfirmationModal';

const SessionScheduler = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    date: '',
    time: '',
    type: 'Articulation',
    email: ''
  });
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [sessionData, setSessionData] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/schedule', {
        ...form,
        userId: user.userId,
        name: user.name
      });
      setSessionData({ ...form });
      setShowModal(true);
      setStatus('✅ Scheduled successfully!');
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to schedule');
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">📅 Schedule a Therapy Session</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          name="date"
          className="w-full border p-2 rounded"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          className="w-full border p-2 rounded"
          value={form.time}
          onChange={handleChange}
          required
        />
        <select
          name="type"
          className="w-full border p-2 rounded"
          value={form.type}
          onChange={handleChange}
        >
          <option>Articulation</option>
          <option>Fluency</option>
          <option>Voice</option>
          <option>Language</option>
        </select>
        <input
          type="email"
          name="email"
          placeholder="Email for confirmation"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />

        {/* Auto-Suggest Time Slots */}
        <div className="mt-2">
          <label className="text-sm font-medium mb-1 block">Suggested Times:</label>
          <div className="flex gap-2">
            {['10:00', '13:30', '15:00'].map((slot) => (
              <button
                key={slot}
                type="button"
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                onClick={() => setForm({ ...form, time: slot })}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Confirm Session
        </button>
      </form>

      {status && <p className="text-sm mt-3 text-gray-600">{status}</p>}

      <SessionConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        session={sessionData}
      />
    </div>
  );
};
useEffect(() => {
  axios.get('/api/availability').then(res => {
    // use to auto-populate options from DB
  });
}, []);

export default SessionScheduler;

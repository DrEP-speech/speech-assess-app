import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BulkSessionReassigner = () => {
  const [sessions, setSessions] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState('');

  useEffect(() => {
    axios.get('/api/schedule/all').then((res) => setSessions(res.data));
    axios.get('/api/users/therapists').then((res) => setTherapists(res.data));
  }, []);

  const toggleSession = (sessionId) => {
    setSelectedSessions((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const handleReassign = async () => {
    if (!selectedTherapist || selectedSessions.length === 0) return;
    try {
      await axios.put('/api/schedule/bulk-reassign', {
        sessionIds: selectedSessions,
        therapistId: selectedTherapist,
      });
      alert('Sessions reassigned.');
    } catch (err) {
      console.error(err);
      alert('Reassignment failed.');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Bulk Reassign Sessions</h2>

      <select
        value={selectedTherapist}
        onChange={(e) => setSelectedTherapist(e.target.value)}
        className="mb-3 p-2 border rounded w-full"
      >
        <option value="">Select Therapist</option>
        {therapists.map((t) =>

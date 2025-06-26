import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientAssignmentPanel = () => {
  const [clients, setClients] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedTherapist, setSelectedTherapist] = useState('');

  useEffect(() => {
    axios.get('/api/users/clients').then((res) => setClients(res.data));
    axios.get('/api/users/therapists').then((res) => setTherapists(res.data));
  }, []);

  const handleAssign = async () => {
    try {
      await axios.put('/api/users/assign-client', {
        clientId: selectedClient,
        therapistId: selectedTherapist,
      });
      alert('Client assigned successfully.');
    } catch (err) {
      console.error('Assignment error:', err);
      alert('Error assigning client.');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-sm mt-6">
      <h2 className="text-lg font-semibold mb-3">Assign Client to Therapist</h2>

      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">Select Client</option>
          {clients.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={selectedTherapist}
          onChange={(e) => setSelectedTherapist(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">Select Therapist</option>
          {therapists.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleAssign}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Assign
        </button>
      </div>
    </div>
  );
};

export default ClientAssignmentPanel;

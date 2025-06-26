import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssignPatients = () => {
  const [therapists, setTherapists] = useState([]);
  const [parents, setParents] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState('');
  const [assignedMessage, setAssignedMessage] = useState('');

  useEffect(() => {
    axios.get('/api/users').then(({ data }) => {
      setTherapists(data.filter(u => u.role === 'therapist'));
      setParents(data.filter(u => u.role === 'parent'));
    });
  }, []);

  const assign = async (parentId) => {
    await axios.post('/api/users/assign', {
      therapistId: selectedTherapist,
      parentId
    });
    setAssignedMessage('✅ Patient assigned!');
  };

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">🧑‍⚕️ Assign Therapist to Parent</h2>
      <select onChange={e => setSelectedTherapist(e.target.value)} className="border p-2 w-full mb-4">
        <option value="">Select Therapist</option>
        {therapists.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
      </select>
      <ul className="space-y-2">
        {parents.map(p => (
          <li key={p._id}>
            {p.name} ({p.email})
            <button
              onClick={() => assign(p._id)}
              className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
            >
              Assign
            </button>
          </li>
        ))}
      </ul>
      {assignedMessage && <p className="mt-3 text-green-600">{assignedMessage}</p>}
    </div>
  );
};

export default AssignPatients;

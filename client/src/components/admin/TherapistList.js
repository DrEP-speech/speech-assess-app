import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TherapistList = () => {
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    axios.get('/api/users/therapists')
      .then((res) => setTherapists(res.data))
      .catch((err) => console.error('Therapist fetch error:', err));
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Therapist Directory</h2>
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Assigned Clients</th>
          </tr>
        </thead>
        <tbody>
          {therapists.map((t) => (
            <tr key={t._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{t.name}</td>
              <td className="py-2 px-4 border-b">{t.email}</td>
              <td className="py-2 px-4 border-b">{t.assignedClients?.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TherapistList;

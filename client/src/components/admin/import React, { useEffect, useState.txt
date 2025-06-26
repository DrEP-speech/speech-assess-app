import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecentlyAssignedFilter from './RecentlyAssignedFilter';

const AssignedClientsPanel = () => {
  const [clients, setClients] = useState([]);
  const [range, setRange] = useState('all');

  useEffect(() => {
    const fetchClients = async () => {
      const res = await axios.get('/api/clients');
      setClients(res.data);
    };
    fetchClients();
  }, []);

  const filtered = clients.filter((c) => {
    if (range === 'all') return true;
    const assignedAt = new Date(c.assignedAt);
    const daysAgo = (Date.now() - assignedAt.getTime()) / (1000 * 60 * 60 * 24);
    return daysAgo <= parseInt(range);
  });

  return (
    <div className="border p-4 rounded shadow bg-white mt-8">
      <h2 className="text-lg font-semibold mb-2">🧾 Assigned Clients</h2>
      <RecentlyAssignedFilter selectedRange={range} setSelectedRange={setRange} />

      <ul className="divide-y">
        {filtered.map((c) => (
          <li key={c._id} className="py-2">
            <strong>{c.name}</strong> — Assigned to: <span className="text-blue-600">{c.therapistId?.name || 'N/A'}</span>
            <div className="text-xs text-gray-600">
              Assigned: {new Date(c.assignedAt).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignedClientsPanel;

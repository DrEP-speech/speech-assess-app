import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BenchmarkTracker = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const { data } = await axios.get('/api/progress/all'); // admin-only
      setEntries(data);
    };
    fetchAll();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">🧭 Benchmark Tracker</h2>
      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="border-b">
              <th>Date</th><th>User</th><th>Benchmark</th><th>Fluency</th><th>Grammar</th><th>Clarity</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={i} className="border-b">
                <td>{new Date(e.date).toLocaleDateString()}</td>
                <td>{e.userId}</td>
                <td>{e.benchmark || '—'}</td>
                <td>{e.fluency}</td>
                <td>{e.grammar}</td>
                <td>{e.clarity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BenchmarkTracker;

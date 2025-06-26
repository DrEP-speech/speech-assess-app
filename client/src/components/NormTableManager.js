import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NormTableManager = () => {
  const [norms, setNorms] = useState({});
  const [selectedAge, setSelectedAge] = useState('');
  const [mean, setMean] = useState('');
  const [stdDev, setStdDev] = useState('');

  useEffect(() => {
    axios.get('/api/norms/articulation').then(({ data }) => setNorms(data));
  }, []);

  const updateNorm = async () => {
    await axios.post('/api/norms/articulation', {
      age: selectedAge, mean, stdDev
    });
    setNorms({ ...norms, [selectedAge]: { mean, stdDev } });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">📘 Norm Table Manager</h2>
      <select onChange={(e) => setSelectedAge(e.target.value)} className="border p-2 mb-2 w-full">
        <option value="">Select Age</option>
        {[...Array(18)].map((_, i) => (
          <option key={i}>{i + 1}</option>
        ))}
      </select>
      <input type="number" placeholder="Mean" className="border p-2 mb-2 w-full"
        onChange={(e) => setMean(Number(e.target.value))} />
      <input type="number" placeholder="Std Dev" className="border p-2 mb-2 w-full"
        onChange={(e) => setStdDev(Number(e.target.value))} />
      <button onClick={updateNorm} className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>

      <div className="mt-6 text-sm">
        <h3 className="font-semibold">Current Norms:</h3>
        <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(norms, null, 2)}</pre>
      </div>
    </div>
  );
};

export default NormTableManager;

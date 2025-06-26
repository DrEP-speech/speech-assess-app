import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUserProgress } from '../api/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const ParentProgressSummary = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchUserProgress(user.userId);
      const simplified = data.map(entry => ({
        date: new Date(entry.date).toLocaleDateString(),
        score: Math.round((entry.fluency + entry.grammar + entry.clarity) / 3)
      }));
      setSummary(simplified);
    };
    load();
  }, [user]);

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">📊 Your Child's Progress</h2>
      <LineChart width={600} height={300} data={summary}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
      <p className="text-sm text-gray-500 mt-2">
        This line shows your child’s overall speech progress over time.
      </p>
    </div>
  );
};

export default ParentProgressSummary;

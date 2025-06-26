import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const GrowthGraph = ({ data }) => {
  return (
    <div className="mt-4">
      <h3 className="font-bold mb-2">📈 Growth Across Benchmarks</h3>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="fluency" stroke="#8884d8" />
        <Line type="monotone" dataKey="grammar" stroke="#82ca9d" />
        <Line type="monotone" dataKey="clarity" stroke="#ffc658" />
      </LineChart>
    </div>
  );
};

export default GrowthGraph;

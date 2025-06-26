import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const MonthlyTrendsChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    axios.get('/api/analytics/monthly').then((res) => {
      setMonthlyData(res.data);
    });
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow-sm mt-6">
      <h2 className="text-lg font-semibold mb-3">Monthly Session Trends</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="totalSessions" stroke="#4f46e5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTrendsChart;

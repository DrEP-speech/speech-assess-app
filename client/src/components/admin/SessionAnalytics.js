import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const COLORS = ['#4ade80', '#60a5fa', '#facc15', '#f87171', '#c084fc'];

const SessionAnalytics = () => {
  const [stats, setStats] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get('/api/analytics/sessions'); // You’ll need this backend route
      const sessionData = res.data;

      // Prepare therapist workload chart
      const groupedByTherapist = sessionData.reduce((acc, session) => {
        const name = session.therapistName || 'Unassigned';
        acc[name] = (acc[name] || 0) + 1;
        return acc;
      }, {});
      const barChartData = Object.entries(groupedByTherapist).map(([name, count]) => ({
        name,
        sessions: count,
      }));
      setStats(barChartData);

      // Prepare pie chart for status
      const groupedByStatus = sessionData.reduce((acc, session) => {
        const status = session.status || 'pending';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});
      const pieData = Object.entries(groupedByStatus).map(([status, count]) => ({
        name: status,
        value: count,
      }));
      setStatusCounts(pieData);
    } catch (err) {
      console.error('Failed to load analytics:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Session Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart: Sessions by Therapist */}
        <div>
          <h3 className="text-md font-semibold mb-2">Sessions per Therapist</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="sessions" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Session Status Breakdown */}
        <div>
          <h3 className="text-md font-semibold mb-2">Session Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusCounts}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {statusCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SessionAnalytics;

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUserProgress } from '../api/api';
import GrowthGraph from './GrowthGraph';
import { useProgressInsight } from '../hooks/useProgressInsight';

const GrowthGraphDashboard = () => {
<GrowthGraphExport progressData={formatData()} />
  const { user } = useAuth();
  const [rawData, setRawData] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadData = async () => {
      if (!user?.userId) return;
      try {
        const { data } = await fetchUserProgress(user.userId);
        setRawData(data);
      } catch (error) {
        console.error('Failed to fetch progress data:', error);
      }
    };
    loadData();
  }, [user]);

  const formatData = () => {
    if (filter === 'weekly') {
      return rawData.slice(-4).map((entry, index) => ({
        date: `Week ${index + 1}`,
        fluency: entry.fluency,
        grammar: entry.grammar,
        clarity: entry.clarity
      }));
    }

    if (filter === 'monthly') {
      const grouped = {};
      rawData.forEach((entry) => {
        const month = new Date(entry.date).toLocaleString('default', { month: 'short' });
        if (!grouped[month]) {
          grouped[month] = { fluency: 0, grammar: 0, clarity: 0, count: 0 };
        }
        grouped[month].fluency += entry.fluency;
        grouped[month].grammar += entry.grammar;
        grouped[month].clarity += entry.clarity;
        grouped[month].count += 1;
      });

      return Object.entries(grouped).map(([month, values]) => ({
        date: month,
        fluency: Math.round(values.fluency / values.count),
        grammar: Math.round(values.grammar / values.count),
        clarity: Math.round(values.clarity / values.count)
      }));
    }

    // default 'all' (by benchmark label or date)
    return rawData.map((entry) => ({
      date: entry.benchmark || new Date(entry.date).toLocaleDateString(),
      fluency: entry.fluency,
      grammar: entry.grammar,
      clarity: entry.clarity
    }));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">📈 Progress Overview</h2>

      <div className="mb-4 space-x-2">
        <button

const insight = useProgressInsight(formatData());

{insight && (
  <div className="mt-2 text-yellow-700 font-semibold">
    {insight}
  </div>
)}

import React, { useEffect, useState } from 'react';
import GrowthGraph from './GrowthGraph';

const TherapistDashboard = () => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    // You can later replace this with a real API call
    setProgressData([
      { date: 'Week 1', fluency: 60, grammar: 65, clarity: 70 },
      { date: 'Week 2', fluency: 68, grammar: 72, clarity: 75 },
      { date: 'Week 3', fluency: 72, grammar: 74, clarity: 78 },
      { date: 'Week 4', fluency: 77, grammar: 80, clarity: 82 },
    ]);
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">👨‍⚕️ Therapist Dashboard</h2>

      {/* Your existing dashboard links here */}
      
      {/* Growth Graph Below */}
      <GrowthGraph data={progressData} />
    </div>
  );
};

export default TherapistDashboard;

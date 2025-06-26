import { useEffect, useState } from 'react';

export const useProgressInsight = (progressData = []) => {
  const [insight, setInsight] = useState('');

  useEffect(() => {
    if (progressData.length < 4) return;

    const recent = progressData.slice(-4);
    const averages = recent.map(d => (d.fluency + d.grammar + d.clarity) / 3);
    const growthRate = averages[3] - averages[0];

    if (growthRate > 5) setInsight('🚀 Strong progress this month!');
    else if (growthRate > 0) setInsight('📈 Steady improvement. Keep practicing.');
    else setInsight('⚠️ Progress plateau detected. Consider adjusting strategies.');
  }, [progressData]);

  return insight;
};

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

const ScoreRadarChart = ({ data }) => {
  const radarData = [
    { subject: 'Fluency', score: data.fluencyScore || 0 },
    { subject: 'Grammar', score: data.grammarScore || 0 },
    { subject: 'Clarity', score: data.clarityScore || 0 },
    { subject: 'Pacing', score: data.pacingScore || 0 },
    { subject: 'Tone', score: data.toneScore || 0 }
  ];

  return (
    <div className="my-6">
      <h3 className="font-semibold mb-2">🎯 Speech Score Overview</h3>
      <RadarChart cx={200} cy={200} outerRadius={150} width={400} height={400} data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 10]} />
        <Tooltip />
        <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </div>
  );
};

export default ScoreRadarChart;

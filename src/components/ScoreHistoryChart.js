import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const ScoreHistoryChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios.get('/api/scores/history')
      .then(res => {
        const dates = res.data.map(item => new Date(item.createdAt).toLocaleDateString());
        const scores = res.data.map(item => item.score);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Speech Score',
              data: scores,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.3,
            }
          ]
        });
      });
  }, []);

  return (
    <div>
      <h3>📈 Speech Score Trends</h3>
      <Line data={chartData} />
    </div>
  );
};

export default ScoreHistoryChart;

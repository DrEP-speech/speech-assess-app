import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import './styles/ScoreChart.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ScoreChart = ({ scoreData = [] }) => {
  const data = {
    labels: ['Intro', 'Middle', 'Final'],
    datasets: [{
      label: 'Scores',
      data: scoreData,
      backgroundColor: 'lightblue'
    }]
  };

  return (
    <div className="score-chart">
      <Bar data={data} />
    </div>
  );
};

export default ScoreChart;
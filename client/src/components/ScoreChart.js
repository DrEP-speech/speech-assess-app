import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const ScoreChart = ({ scores }) => {
  const data = {
    labels: scores.map((entry) => new Date(entry.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: "Speech Score",
        data: scores.map((entry) => entry.score),
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ margin: "2rem auto", width: "90%" }}>
      <h3>📈 Score Progress Chart</h3>
      <Line data={data} />
    </div>
  );
};

export default ScoreChart;

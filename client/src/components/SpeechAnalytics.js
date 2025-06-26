
import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "./SpeechTrend.css";

const SpeechAnalytics = ({ userId }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get(`/api/speech-analytics/${userId}`);
        setScores(response.data);
        renderChart(response.data);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
      }
    };

    fetchScores();
  }, [userId]);

  const renderChart = (data) => {
    const ctx = document.getElementById("speechTrendChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map(entry => new Date(entry.timestamp).toLocaleDateString()),
        datasets: [{
          label: "AI Score Trend",
          data: data.map(entry => entry.score),
          fill: false,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  };

  return (
    <div className="speech-trend-container">
      <h3>📊 AI Score Trend</h3>
      <canvas id="speechTrendChart"></canvas>
    </div>
  );
};

export default SpeechAnalytics;

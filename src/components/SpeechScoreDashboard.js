import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/SpeechScoreDashboard.css';

const SpeechScoreDashboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('/api/score-history');
        setScores(response.data);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="dashboard">
      <h2>Speech Assessment AI Scores</h2>
      <table className="dashboard-table">
        <thead>
          <tr><th>Transcript</th><th>Score</th><th>Notes</th><th>Date</th></tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{score.transcript}</td>
              <td>{score.score}</td>
              <td>{score.notes}</td>
              <td>{new Date(score.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpeechScoreDashboard;
// src/components/ScoreHistoryVisualizer.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScoreHistoryVisualizer = () => {
  const [scores, setScores] = useState([]);
  const [filters, setFilters] = useState({
    user: '',
    startDate: '',
    endDate: '',
    minScore: '',
    maxScore: ''
  });

  const fetchScores = async () => {
    try {
      const { data } = await axios.get('/api/scores', { params: filters });
      setScores(data);
    } catch (err) {
      console.error('Failed to fetch scores', err);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const handleChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = () => fetchScores();

  return (
    <div style={{ margin: '40px' }}>
      <h2>📊 Score History Visualizer</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input name="user" placeholder="User" onChange={handleChange} />
        <input name="startDate" type="date" onChange={handleChange} />
        <input name="endDate" type="date" onChange={handleChange} />
        <input name="minScore" placeholder="Min Score" onChange={handleChange} />
        <input name="maxScore" placeholder="Max Score" onChange={handleChange} />
        <button onClick={handleFilter}>Apply Filters</button>
      </div>

      <table border="1" cellPadding="10" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
            <th>Assessment Type</th>
            <th>Notes</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{score.user}</td>
              <td>{score.score}</td>
              <td>{score.assessmentType}</td>
              <td>{score.notes || '-'}</td>
              <td>{new Date(score.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreHistoryVisualizer;

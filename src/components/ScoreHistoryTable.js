import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/ScoreHistoryTable.css';

const ScoreHistoryTable = () => {
  const [scores, setScores] = useState([]);
  const [filters, setFilters] = useState({ name: '', minScore: '', maxScore: '' });

  const fetchFilteredScores = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await axios.get(`/api/score-history?${query}`);
      setScores(response.data);
    } catch (error) {
      console.error('Error fetching filtered scores:', error);
    }
  };

  useEffect(() => { fetchFilteredScores(); }, []);

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="history-table">
      <h3>📋 Filtered Score History</h3>
      <input name="name" placeholder="Name" onChange={handleInputChange} />
      <input name="minScore" placeholder="Min Score" onChange={handleInputChange} />
      <input name="maxScore" placeholder="Max Score" onChange={handleInputChange} />
      <button onClick={fetchFilteredScores}>Apply Filters</button>
      <table>
        <thead>
          <tr><th>Name</th><th>Score</th><th>Date</th></tr>
        </thead>
        <tbody>
          {scores.map((s, i) => (
            <tr key={i}>
              <td>{s.transcript}</td>
              <td>{s.score}</td>
              <td>{new Date(s.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreHistoryTable;
import React, { useEffect, useState } from 'react';
import { fetchSpeechScores } from '../api/api';
import AnimatedScoreBar from './AnimatedScoreBar';

const ScoreHistory = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const getScores = async () => {
      const { data } = await fetchSpeechScores();
      setScores(data.reverse()); // most recent first
    };
    getScores();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">📈 Score History</h2>
      {scores.length === 0 ? (
        <p>No scores yet.</p>
      ) : (
        scores.map((score, idx) => (
          <div key={idx} className="mb-4 p-4 border rounded shadow-sm">
            <p className="text-sm text-gray-500 mb-2">🗓️ {new Date(score.createdAt).toLocaleString()}</p>
            <AnimatedScoreBar label="Fluency" score={score.fluencyScore} />
            <AnimatedScoreBar label="Grammar" score={score.grammarScore} />
            <AnimatedScoreBar label="Clarity" score={score.clarityScore} />
            <AnimatedScoreBar label="Tone" score={score.toneScore} />
            <AnimatedScoreBar label="Pacing" score={score.pacingScore} />
          </div>
        ))
      )}
    </div>
  );
};

export default ScoreHistory;

import React from 'react';

const SessionPatternAnalyzer = ({ sessionData = [] }) => {
  if (!Array.isArray(sessionData) || sessionData.length === 0) {
    return <div>No session data available to analyze patterns.</div>;
  }

  const totalSessions = sessionData.length;
  const avgScore = (
    sessionData.reduce((acc, session) => acc + (session.score || 0), 0) / totalSessions
  ).toFixed(2);

  return (
    <div className="session-pattern-analyzer">
      <h3>📈 Session Pattern Analyzer</h3>
      <p>Total Sessions: {totalSessions}</p>
      <p>Average Score: <strong>{avgScore}</strong></p>
    </div>
  );
};

export default SessionPatternAnalyzer;
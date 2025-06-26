import React from "react";

const SessionRecommendation = ({ score }) => {
  const getRecommendation = () => {
    const numericScore = parseInt(score);
    if (isNaN(numericScore)) return "⚠️ No score available.";
    if (numericScore >= 85) return "✅ Maintain current session frequency.";
    if (numericScore >= 60) return "🌀 Consider moderate weekly therapy.";
    return "🔥 High-intensity speech therapy sessions recommended.";
  };

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <h3>🧠 Session Recommendation</h3>
      <p>{getRecommendation()}</p>
    </div>
  );
};

export default SessionRecommendation;
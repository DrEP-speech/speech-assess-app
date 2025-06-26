import React from "react";

const BadgeAward = ({ score }) => {
  const getBadge = () => {
    if (score >= 90) return "🏅 Excellent!";
    if (score >= 75) return "🎖️ Great Job!";
    if (score >= 50) return "👍 Keep Going!";
    return "🚀 Just Starting!";
  };

  return (
    <div style={{ fontSize: "1.5rem", textAlign: "center", margin: "1rem" }}>
      <p>{getBadge()}</p>
    </div>
  );
};

export default BadgeAward;

import React from "react";

const RewardsDashboard = ({ badges }) => {
  const defaultBadges = badges || ["🎯 Participation", "🗣️ First Submission", "🔥 Fluent Speaker"];

  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h3>🏅 Rewards Dashboard</h3>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
        {defaultBadges.map((badge, index) => (
          <div key={index} style={{
            border: "2px solid gold",
            padding: "10px",
            borderRadius: "50%",
            backgroundColor: "#fffbea",
            fontSize: "24px"
          }}>
            {badge}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsDashboard;
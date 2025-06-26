import React, { useState } from "react";
import axios from "axios";

const AdaptiveAICoach = () => {
  const [feedback, setFeedback] = useState("");
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/adaptive-coach", { input });
      setFeedback(response.data.feedback);
    } catch (err) {
      console.error("AI Coach error:", err);
      setFeedback("Error retrieving feedback.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🤖 Adaptive AI Coach</h2>
      <textarea
        rows="4"
        cols="50"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your speech or area you'd like help with..."
      />
      <br />
      <button onClick={handleSubmit}>🧠 Get Coaching</button>
      <div style={{ marginTop: "15px" }}>
        <strong>Feedback:</strong>
        <p>{feedback}</p>
      </div>
    </div>
  );
};

export default AdaptiveAICoach;

import React, { useState } from "react";
import axios from "axios";

const AdaptivePromptEngine = () => {
  const [suggestion, setSuggestion] = useState("");
  const [level, setLevel] = useState("beginner");

  const generatePrompt = async () => {
    try {
      const response = await axios.post("/api/adaptive-prompt", { level });
      setSuggestion(response.data.prompt);
    } catch (err) {
      console.error("Prompt generation error:", err);
      setSuggestion("Error generating prompt.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧩 Adaptive Practice Prompt</h2>
      <label>
        Choose Level:
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </label>
      <br />
      <button onClick={generatePrompt}>🎯 Generate Prompt</button>
      <div style={{ marginTop: "15px" }}>
        <strong>Suggested Prompt:</strong>
        <p>{suggestion}</p>
      </div>
    </div>
  );
};

export default AdaptivePromptEngine;

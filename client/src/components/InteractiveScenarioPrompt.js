import React, { useState } from "react";

const scenarioPrompts = [
  "Describe how to make a peanut butter and jelly sandwich.",
  "Explain what you would do if you lost your keys.",
  "Tell a story about your favorite holiday memory.",
  "Give directions from your house to the grocery store.",
  "Describe your morning routine.",
];

const speakPrompt = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
};

const InteractiveScenarioPrompt = () => {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handlePromptClick = () => {
    const prompt = scenarioPrompts[Math.floor(Math.random() * scenarioPrompts.length)];
    setCurrentPrompt(prompt);
    speakPrompt(prompt);
  };

  const handleChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmit = () => {
    alert("Response submitted for evaluation: " + response);
    // Optionally send response to AI backend
    setResponse("");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3>🎯 Interactive Scenario Prompt</h3>
      <button onClick={handlePromptClick}>🎤 Generate Scenario</button>
      {currentPrompt && (
        <>
          <p style={{ marginTop: "15px" }}><strong>Prompt:</strong> {currentPrompt}</p>
          <textarea
            rows="4"
            cols="50"
            value={response}
            onChange={handleChange}
            placeholder="Type your response here or speak aloud..."
            style={{ marginTop: "10px", padding: "10px" }}
          />
          <br />
          <button onClick={handleSubmit} style={{ marginTop: "10px" }}>✅ Submit Response</button>
        </>
      )}
    </div>
  );
};

export default InteractiveScenarioPrompt;
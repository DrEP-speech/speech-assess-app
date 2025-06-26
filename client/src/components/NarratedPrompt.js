import React from "react";

const NarratedPrompt = ({ prompt }) => {
  const speakPrompt = () => {
    const utterance = new SpeechSynthesisUtterance(prompt);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <h3>🗣️ AI-Narrated Prompt</h3>
      <button onClick={speakPrompt}>▶️ Play Prompt</button>
    </div>
  );
};

export default NarratedPrompt;
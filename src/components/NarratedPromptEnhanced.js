
import React, { useState } from "react";

const prompts = [
  "Say the sentence: The sun shines brightly.",
  "Repeat after me: Sally sells seashells by the seashore.",
  "Can you say: Red lorries run rapidly?",
  "Now try this: Peter Piper picked a peck of pickled peppers."
];

const NarratedPrompt = ({ onComplete }) => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakPrompt = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onComplete) onComplete(text);
    };
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const nextPrompt = () => {
    if (currentPromptIndex < prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
    } else {
      alert("✅ You've completed all prompts!");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3>🗣️ Narrated Prompt</h3>
      <p><strong>Prompt:</strong> {prompts[currentPromptIndex]}</p>
      <button onClick={() => speakPrompt(prompts[currentPromptIndex])} disabled={isSpeaking}>
        🔊 Speak Prompt
      </button>
      <button onClick={nextPrompt} style={{ marginLeft: "10px" }} disabled={isSpeaking}>
        ⏭️ Next Prompt
      </button>
    </div>
  );
};

export default NarratedPrompt;

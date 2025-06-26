import React from 'react';

const NarratedPrompt = () => {
  const speakPrompt = () => {
    const utterance = new SpeechSynthesisUtterance("Say the word 'sun' slowly and clearly.");
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>🎙️ Narrated AI Prompt</h2>
      <button onClick={speakPrompt}>Play Prompt</button>
    </div>
  );
};

export default NarratedPrompt;

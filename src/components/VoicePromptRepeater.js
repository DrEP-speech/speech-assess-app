import React, { useEffect } from 'react';

const VoicePromptRepeater = ({ phrase }) => {
  useEffect(() => {
    if (phrase) {
      const utter = new SpeechSynthesisUtterance(phrase);
      speechSynthesis.speak(utter);
    }
  }, [phrase]);

  return (
    <div style={{ padding: '10px' }}>
      <h4>Prompt:</h4>
      <p style={{ fontWeight: 'bold', fontSize: '18px' }}>{phrase}</p>
    </div>
  );
};

export default VoicePromptRepeater;

import React, { useEffect } from 'react';

const AdaptiveSoundPrompt = ({ sound }) => {
  useEffect(() => {
    if (sound) {
      const utterance = new SpeechSynthesisUtterance(`Please say the sound ${sound}`);
      speechSynthesis.speak(utterance);
    }
  }, [sound]);

  return (
    <div>
      <h3>Repeat the Prompted Sound:</h3>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{sound}</p>
    </div>
  );
};

export default AdaptiveSoundPrompt;

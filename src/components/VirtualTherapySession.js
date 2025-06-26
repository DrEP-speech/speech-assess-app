import React, { useState } from 'react';

const VirtualTherapySession = () => {
  const [sessionActive, setSessionActive] = useState(false);

  const startSession = () => {
    console.log("Starting virtual session...");
    setSessionActive(true);
  };

  const endSession = () => {
    console.log("Ending virtual session...");
    setSessionActive(false);
  };

  return (
    <div className="virtual-session">
      <h2>🖥️ Virtual Therapy Session</h2>
      {sessionActive ? (
        <div>
          <p>Session is active. Recording and analyzing...</p>
          <button onClick={endSession}>End Session</button>
        </div>
      ) : (
        <button onClick={startSession}>Start Session</button>
      )}
    </div>
  );
};

export default VirtualTherapySession;

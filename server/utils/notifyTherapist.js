import React from 'react';

const TeletherapyLauncher = () => {
  const sessionLink = "https://meet.google.com/new"; // or Zoom pre-created room

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">📹 Teletherapy Session</h2>
      <p>Use the secure link below to begin your virtual session:</p>
      <a
        href={sessionLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Launch Session
      </a>
    </div>
  );
};

export default TeletherapyLauncher;

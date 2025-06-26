import React from 'react';

const GenerateTelehealthLink = ({ sessionId, onLinkGenerated }) => {
  const handleGenerate = () => {
    const link = `https://meet.google.com/${Math.random().toString(36).substring(2, 9)}`;
    onLinkGenerated(link);
  };

  return (
    <button
      onClick={handleGenerate}
      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
    >
      🔗 Generate Link
    </button>
  );
};

export default GenerateTelehealthLink;

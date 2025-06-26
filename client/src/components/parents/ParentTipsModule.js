import React from 'react';

const ParentTipsModule = ({ tips }) => {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
      <h3 className="text-md font-bold text-blue-700 mb-2">💡 Speech Tips for Home</h3>
      <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
        {tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default ParentTipsModule;

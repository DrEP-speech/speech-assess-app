import React from 'react';

const AnimatedScoreBar = ({ label, score }) => {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{score}/10</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-green-500 h-full transition-all duration-1000 ease-out"
          style={{ width: `${(score / 10) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AnimatedScoreBar;

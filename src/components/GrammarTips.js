import React from 'react';

const GrammarTips = () => {
  const tips = [
    "✔️ Use consistent verb tenses",
    "✔️ Avoid sentence fragments",
    "✔️ Use subject-verb agreement",
    "✔️ Vary sentence structure for fluency",
    "✔️ Use active voice over passive voice"
  ];

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-6">
      <h4 className="font-semibold text-yellow-800 mb-2">Grammar Tips</h4>
      <ul className="list-disc list-inside text-sm text-yellow-700">
        {tips.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default GrammarTips;

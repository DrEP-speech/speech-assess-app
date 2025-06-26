import React from 'react';

const PronunciationHeatmap = ({ transcript }) => {
  if (!transcript) return null;

  const words = transcript.split(' ').map((word, index) => {
    const style = {
      backgroundColor: index % 2 === 0 ? '#ffcdd2' : '#c8e6c9',
      padding: '2px 5px',
      margin: '2px',
      borderRadius: '4px',
      display: 'inline-block'
    };
    return <span key={index} style={style}>{word}</span>;
  });

  return (
    <div>
      <h3>🔥 Pronunciation Heatmap</h3>
      <div>{words}</div>
    </div>
  );
};

export default PronunciationHeatmap;

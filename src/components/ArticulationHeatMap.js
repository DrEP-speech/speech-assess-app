
import React from 'react';

const ArticulationHeatMap = ({ phonemeAccuracy = {} }) => {
  // Placeholder: Display a color-coded chart of articulation scores
  const phonemes = Object.keys(phonemeAccuracy);

  return (
    <div className="heatmap">
      <h3>Articulation Heat Map</h3>
      <ul>
        {phonemes.map(p => (
          <li key={p} style={{ color: phonemeAccuracy[p] > 75 ? "green" : "red" }}>
            {p.toUpperCase()}: {phonemeAccuracy[p]}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticulationHeatMap;

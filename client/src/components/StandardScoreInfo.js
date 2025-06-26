import React from 'react';

const getDescription = (score) => {
  if (score >= 130) return 'Very Superior';
  if (score >= 120) return 'Superior';
  if (score >= 110) return 'High Average';
  if (score >= 90) return 'Average';
  if (score >= 80) return 'Low Average';
  if (score >= 70) return 'Below Average';
  return 'Significantly Delayed';
};

const getPercentile = (score) => {
  const z = (score - 100) / 15;
  const percentile = Math.round(100 * (1 - 0.5 * (1 + Math.erf(z / Math.sqrt(2)))));
  return percentile;
};

const StandardScoreInfo = ({ stdScore }) => {
  const desc = getDescription(stdScore);
  const percentile = getPercentile(stdScore);

  return (
    <div className="mt-4">
      <p>
        Your standard score of <strong>{stdScore}</strong> is interpreted as <strong>{desc}</strong> 
        and corresponds to the <strong>{percentile}th percentile</strong> of the population.
      </p>
    </div>
  );
};

export default StandardScoreInfo;

function getZScore(raw, mean, stdDev) {
  return (raw - mean) / stdDev;
}

function getPercentile(z) {
  const percentile = Math.round(100 * (1 - 0.5 * (1 + Math.erf(z / Math.sqrt(2)))));
  return percentile;
}

function getDescriptor(score) {
  if (score >= 130) return 'Very Superior';
  if (score >= 120) return 'Superior';
  if (score >= 110) return 'High Average';
  if (score >= 90) return 'Average';
  if (score >= 80) return 'Low Average';
  if (score >= 70) return 'Below Average';
  return 'Significantly Delayed';
}

module.exports = {
  getZScore,
  getPercentile,
  getDescriptor
};

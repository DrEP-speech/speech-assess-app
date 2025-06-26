const express = require('express');
const router = express.Router();
const norms = require('../norms/articulationNorms.json');
const { getZScore, getPercentile, getDescriptor } = require('../utils/scoreUtils');

router.post('/calculate-standard-score', (req, res) => {
  const { rawScore, age } = req.body;
  const ageYear = String(Math.floor(age));

  if (!norms[ageYear]) {
    return res.status(400).json({ error: 'No norm data for this age.' });
  }

  const { mean, stdDev } = norms[ageYear];
  const z = getZScore(rawScore, mean, stdDev);
  const percentile = getPercentile(z);
  const standardScore = Math.round(mean + z * stdDev);
  const descriptor = getDescriptor(standardScore);

  res.json({ standardScore, percentile, descriptor });
});

module.exports = router;

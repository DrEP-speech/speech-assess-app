const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { audioMetadata } = req.body;

  if (!audioMetadata) {
    return res.status(400).json({ error: 'Audio metadata is required' });
  }

  const match = {
    confidenceScore: 0.91,
    matchedProfile: 'Speaker A',
    pitchRange: '85Hz–180Hz',
    speakingRate: '125 wpm',
  };

  res.json({ match });
});

module.exports = router;

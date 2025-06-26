const express = require('express');
const router = express.Router();

router.post('/check', async (req, res) => {
  try {
    const { transcript } = req.body;

    // Simulated grammar feedback logic
    const result = {
      errors: ['Subject-verb agreement error in sentence 2'],
      fluencyScore: 8.5,
      suggestions: ['Use present tense consistently']
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Grammar check failed', error: err.message });
  }
});

module.exports = router;

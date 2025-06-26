const express = require('express');
const router = express.Router();
const Availability = require('../models/TherapistAvailability');

const predefined = [
  { date: '2025-06-25', slots: ['10:00', '11:00', '13:00'] },
  { date: '2025-06-26', slots: ['09:00', '14:00'] },
  { date: '2025-06-27', slots: ['08:30', '12:30', '15:30'] }
];

router.post('/generate', async (req, res) => {
  try {
    await Availability.deleteMany({});
    await Availability.insertMany(predefined);
    res.json({ message: 'Availability generated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate' });
  }
});

router.get('/', async (req, res) => {
  const slots = await Availability.find({});
  res.json(slots);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const Client = require('../models/Client');
const { protect } = require('../middleware/authMiddleware');

// GET /api/therapists/:id/progress-snapshot
router.get('/:id/progress-snapshot', protect, async (req, res) => {
  const therapistId = req.params.id;

  const totalClients = await Client.countDocuments({ therapistId });
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const sessions = await Session.find({ therapistId });
  const sessionsThisWeek = sessions.filter(s => s.date >= oneWeekAgo).length;
  const completedSessions = sessions.filter(s => s.status === 'completed').length;
  const noShows = sessions.filter(s => s.status === 'no-show').length;

  res.json({
    totalClients,
    sessionsThisWeek,
    completedSessions,
    noShows,
  });
});

module.exports = router;

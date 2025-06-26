const User = require('../models/User');
const Session = require('../models/Session');

// GET /api/analytics/suggestions
router.get('/suggestions', async (req, res) => {
  const suggestions = [];

  // Suggest clients not assigned
  const unassignedClients = await User.find({ role: 'client', assignedTherapist: { $exists: false } });
  if (unassignedClients.length) {
    suggestions.push(`⚠️ ${unassignedClients.length} client(s) have no assigned therapist.`);
  }

  // Suggest sessions without status
  const unstampedSessions = await Session.countDocuments({ status: { $exists: false } });
  if (unstampedSessions > 0) {
    suggestions.push(`📝 ${unstampedSessions} session(s) are missing status labels.`);
  }

  // Suggest therapists with no clients
  const therapists = await User.find({ role: 'therapist' });
  const lonelyTherapists = therapists.filter(t => (t.assignedClients?.length || 0) === 0);
  if (lonelyTherapists.length > 0) {
    suggestions.push(`👤 ${lonelyTherapists.length} therapist(s) have no assigned clients.`);
  }

  res.json(suggestions);
});

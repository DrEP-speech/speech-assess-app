const verifyToken = require('../middleware/verifyToken');
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  const users = await User.find({}, 'name email role');
  res.json(users);
});
router.get('/therapists', async (req, res) => {
  try {
    const therapists = await User.find({ role: 'therapist' }).select('name email assignedClients');
    res.json(therapists);
  } catch (err) {
    console.error('Therapist fetch error:', err);
    res.status(500).json({ error: 'Unable to fetch therapists' });
  }
});


router.post('/assign', async (req, res) => {
  const { therapistId, parentId } = req.body;

  const therapist = await User.findById(therapistId);
  const parent = await User.findById(parentId);

  if (!therapist || !parent) return res.status(404).json({ message: 'User not found' });

  parent.therapistId = therapistId;
  await parent.save();

  res.json({ message: 'Assigned successfully' });
});

router.get('/clients', async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' }).select('name _id email assignedTherapist');
    res.json(clients);
  } catch (err) {
    console.error('Client fetch error:', err);
    res.status(500).json({ error: 'Failed to retrieve clients' });
  }
});// @route   PUT /api/users/assign-client
// @desc    Assign a client to a therapist
// @access  Admin
router.put('/assign-client', async (req, res) => {
  const { clientId, therapistId } = req.body;

  if (!clientId || !therapistId) {
    return res.status(400).json({ error: 'Client ID and Therapist ID are required' });
  }

  try {
    const therapist = await User.findById(therapistId);
    const client = await User.findById(clientId);

    if (!therapist || therapist.role !== 'therapist') {
      return res.status(404).json({ error: 'Therapist not found' });
    }

    if (!client || client.role !== 'client') {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Optional: Add client to therapist’s assignedClients array
    if (!therapist.assignedClients.includes(clientId)) {
      therapist.assignedClients.push(clientId);
      await therapist.save();
    }

    // Optional: Add therapist to client
    client.assignedTherapist = therapistId;
    await client.save();

    res.json({ success: true, message: 'Client assigned successfully.' });
  } catch (err) {
    console.error('Assignment error:', err);
    res.status(500).json({ error: 'Server error during assignment' });
  }
});
// ... after client and therapist are saved
sendEmailNotification({
  to: therapist.email,
  subject: 'New Client Assigned',
  text: `You have been assigned a new client: ${client.name}`,
});


module.exports = router;

const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const { sendTherapistAssignmentEmail } = require('../utils/emailService');
const User = require('../models/User');

router.put('/assign/:clientId', async (req, res) => {
  const { therapistId } = req.body;

  try {
    const updated = await Client.findByIdAndUpdate(
      req.params.clientId,
      {
        therapistId,
        assignedAt: new Date(), // ✅ Track when assignment occurs
      },
      { new: true }
    );

    const therapist = await User.findById(therapistId);
    if (therapist?.email) {
      await sendTherapistAssignmentEmail({
        to: therapist.email,
        clientName: updated.name,
      });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error assigning therapist:', err);
    res.status(500).json({ error: 'Failed to assign therapist' });
  }
});


// @route   GET /api/clients
// @desc    Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().populate('therapistId');
    res.json(clients);
  } catch (err) {
    console.error('Error fetching clients:', err);
    res.status(500).json({ error: 'Server error fetching clients' });
  }
});

// @route   GET /api/clients/unassigned
// @desc    Get all clients with no therapist assigned
router.get('/unassigned', async (req, res) => {
  try {
    const clients = await Client.find({ therapistId: { $exists: false } });
    res.json(clients);
  } catch (error) {
    console.error('Error fetching unassigned clients:', error);
    res.status(500).json({ error: 'Error fetching unassigned clients' });
  }
});

// @route   PUT /api/clients/assign/:clientId
// @desc    Assign a therapist to a client
router.put('/assign/:clientId', async (req, res) => {
  const { therapistId } = req.body;
  try {
    const updated = await Client.findByIdAndUpdate(
      req.params.clientId,
      { therapistId },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error('Error assigning therapist:', err);
    res.status(500).json({ error: 'Failed to assign therapist' });
  }
});

// @route   DELETE /api/clients/:id
// @desc    Delete a client
router.delete('/:id', async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted' });
  } catch (err) {
    console.error('Error deleting client:', err);
    res.status(500).json({ error: 'Failed to delete client' });
  }
});

module.exports = router;

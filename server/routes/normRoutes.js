// server/routes/normRoutes.js

const express = require('express');
const router = express.Router();
const Norm = require('../models/Norm'); // Make sure this model exists
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// @route   POST /api/norms
// @desc    Add new norm entry (admin only)
// @access  Private/Admin
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const norm = new Norm(req.body);
    await norm.save();
    res.status(201).json(norm);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   GET /api/norms
// @desc    Get all norms (public)
router.get('/', async (req, res) => {
  try {
    const norms = await Norm.find();
    res.json(norms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/norms/:id
// @desc    Get single norm entry by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const norm = await Norm.findById(req.params.id);
    if (!norm) return res.status(404).json({ message: 'Norm not found' });
    res.json(norm);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   PUT /api/norms/:id
// @desc    Update a norm entry
// @access  Private/Admin
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const norm = await Norm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!norm) return res.status(404).json({ message: 'Norm not found' });
    res.json(norm);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   DELETE /api/norms/:id
// @desc    Delete a norm entry
// @access  Private/Admin
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const norm = await Norm.findByIdAndDelete(req.params.id);
    if (!norm) return res.status(404).json({ message: 'Norm not found' });
    res.json({ message: 'Norm deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

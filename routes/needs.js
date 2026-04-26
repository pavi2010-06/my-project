const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addNeed, getNeeds } = require('../controllers/needsController');

// @route   POST api/needs/add-need
// @desc    Add a new need
// @access  Private
router.post('/add-need', auth, addNeed);

// @route   GET api/needs
// @desc    Get all needs
// @access  Public
router.get('/', getNeeds);

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { registerVolunteer, getVolunteers } = require('../controllers/volunteersController');

// @route   POST api/volunteers/register-volunteer
// @desc    Register volunteer profile
// @access  Private
router.post('/register-volunteer', auth, registerVolunteer);

// @route   GET api/volunteers
// @desc    Get all volunteers
// @access  Private
router.get('/', auth, getVolunteers);

module.exports = router;

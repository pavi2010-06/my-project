const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { autoAllocate } = require('../controllers/matchController');

// @route   POST api/match/auto-allocate
// @desc    Auto allocate volunteers to pending needs
// @access  Private (Admin)
router.post('/auto-allocate', auth, autoAllocate);

module.exports = router;

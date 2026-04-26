const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getDashboardStats } = require('../controllers/dashboardController');

// @route   GET api/dashboard-stats
// @desc    Get stats for admin dashboard
// @access  Public
router.get('/', getDashboardStats);

module.exports = router;

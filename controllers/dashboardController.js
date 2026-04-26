const Need = require('../models/Need');
const Volunteer = require('../models/Volunteer');
const Allocation = require('../models/Allocation');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalRequests = await Need.countDocuments();
    const activeVolunteers = await Volunteer.countDocuments({ isAllocated: true });
    const urgentNeeds = await Need.countDocuments({ urgencyLevel: { $gte: 4 }, status: 'Pending' });
    
    const needsByCategoryRaw = await Need.aggregate([
      { $group: { _id: '$issueType', count: { $sum: 1 } } }
    ]);
    
    const needsByCategory = {};
    needsByCategoryRaw.forEach(item => {
      needsByCategory[item._id] = item.count;
    });

    const liveAllocations = await Allocation.find()
      .populate('needId', ['location', 'issueType', 'urgencyLevel'])
      .populate('volunteerId', ['name', 'skills'])
      .sort({ assignedAt: -1 })
      .limit(10);

    res.json({
      totalRequests,
      activeVolunteers,
      urgentNeeds,
      needsByCategory,
      liveAllocations
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

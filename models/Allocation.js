const mongoose = require('mongoose');

const AllocationSchema = new mongoose.Schema({
  needId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Need',
    required: true
  },
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
    required: true
  },
  matchScore: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Assigned', 'Accepted', 'Completed'],
    default: 'Assigned'
  },
  assignedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Allocation', AllocationSchema);

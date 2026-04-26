const mongoose = require('mongoose');

const NeedSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  issueType: {
    type: String,
    required: true
  },
  urgencyLevel: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  peopleAffected: {
    type: Number,
    required: true
  },
  requiredSkills: {
    type: [String],
    required: true
  },
  requiredHoursStart: {
    type: Number,
    required: true,
    default: 9 // 9 AM
  },
  requiredHoursEnd: {
    type: Number,
    required: true,
    default: 17 // 5 PM
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Allocated', 'Completed'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Need', NeedSchema);

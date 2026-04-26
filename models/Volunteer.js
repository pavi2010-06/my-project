const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  availableHoursStart: {
    type: Number, // 0-23
    required: true
  },
  availableHoursEnd: {
    type: Number, // 0-23
    required: true
  },
  preferredLocation: {
    type: String,
    required: true
  },
  isAllocated: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);

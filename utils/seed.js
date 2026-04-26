const mongoose = require('mongoose');
const User = require('../models/User');
const Volunteer = require('../models/Volunteer');
const Need = require('../models/Need');
const Allocation = require('../models/Allocation');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    const needCount = await Need.countDocuments();
    if (needCount > 0) {
      console.log('Data already seeded.');
      return;
    }

    console.log('Seeding data...');

    // Users
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    const admin = await User.create({ name: 'Admin User', email: 'admin@vconnect.com', password, role: 'Admin' });
    const v1 = await User.create({ name: 'John Doe', email: 'john@example.com', password, role: 'Volunteer' });
    const v2 = await User.create({ name: 'Jane Smith', email: 'jane@example.com', password, role: 'Volunteer' });
    const v3 = await User.create({ name: 'Mike Ross', email: 'mike@example.com', password, role: 'Volunteer' });

    // Volunteers
    await Volunteer.create([
      { userId: v1._id, name: 'John Doe', skills: ['First Aid', 'Driving'], availableHoursStart: 8, availableHoursEnd: 16, preferredLocation: 'New York' },
      { userId: v2._id, name: 'Jane Smith', skills: ['Cooking', 'Counseling'], availableHoursStart: 10, availableHoursEnd: 18, preferredLocation: 'Los Angeles' },
      { userId: v3._id, name: 'Mike Ross', skills: ['Logistics', 'Heavy Lifting'], availableHoursStart: 12, availableHoursEnd: 20, preferredLocation: 'New York' }
    ]);

    // Needs
    await Need.create([
      { location: 'New York', issueType: 'Health', urgencyLevel: 5, peopleAffected: 50, requiredSkills: ['First Aid'], requiredHoursStart: 9, requiredHoursEnd: 15, deadline: new Date(Date.now() + 86400000) },
      { location: 'New York', issueType: 'Disaster', urgencyLevel: 4, peopleAffected: 200, requiredSkills: ['Logistics', 'Heavy Lifting'], requiredHoursStart: 10, requiredHoursEnd: 18, deadline: new Date(Date.now() + 172800000) },
      { location: 'Los Angeles', issueType: 'Food', urgencyLevel: 3, peopleAffected: 100, requiredSkills: ['Cooking'], requiredHoursStart: 11, requiredHoursEnd: 15, deadline: new Date(Date.now() + 43200000) }
    ]);

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedData;

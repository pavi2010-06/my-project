const Volunteer = require('../models/Volunteer');

exports.registerVolunteer = async (req, res) => {
  try {
    const { name, skills, availableHoursStart, availableHoursEnd, preferredLocation } = req.body;

    // Check if volunteer profile already exists for user
    let volunteer = await Volunteer.findOne({ userId: req.user.id });
    if (volunteer) {
      return res.status(400).json({ msg: 'Volunteer profile already exists for this user' });
    }

    volunteer = new Volunteer({
      userId: req.user.id,
      name,
      skills,
      availableHoursStart,
      availableHoursEnd,
      preferredLocation
    });

    await volunteer.save();
    res.json(volunteer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().populate('userId', ['name', 'email']);
    res.json(volunteers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const Need = require('../models/Need');

exports.addNeed = async (req, res) => {
  try {
    const { location, issueType, urgencyLevel, peopleAffected, requiredSkills, deadline } = req.body;

    const newNeed = new Need({
      location,
      issueType,
      urgencyLevel,
      peopleAffected,
      requiredSkills,
      deadline
    });

    const need = await newNeed.save();
    res.json(need);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getNeeds = async (req, res) => {
  try {
    const status = req.query.status;
    let query = {};
    if (status) {
      query.status = status;
    }
    const needs = await Need.find(query).sort({ createdAt: -1 });
    res.json(needs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

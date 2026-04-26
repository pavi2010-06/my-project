const Need = require('../models/Need');
const Volunteer = require('../models/Volunteer');
const Allocation = require('../models/Allocation');

exports.autoAllocate = async (req, res) => {
  try {
    const pendingNeeds = await Need.find({ status: 'Pending' });
    const availableVolunteers = await Volunteer.find({ isAllocated: false });

    const newAllocations = [];

    for (let need of pendingNeeds) {
      let bestMatch = null;
      let highestScore = 0;

      for (let volunteer of availableVolunteers) {
        // 1. Skill Match (40%)
        const needSkills = need.requiredSkills.map(s => s.toLowerCase());
        const volSkills = volunteer.skills.map(s => s.toLowerCase());
        const commonSkills = needSkills.filter(s => volSkills.includes(s));
        const skillScore = needSkills.length > 0 ? (commonSkills.length / needSkills.length) * 100 : 100;

        // 2. Location Match (30%)
        const locationScore = need.location.toLowerCase() === volunteer.preferredLocation.toLowerCase() ? 100 : 0;

        // 3. Availability Match (20%) - Hours overlap
        const startMax = Math.max(volunteer.availableHoursStart, need.requiredHoursStart);
        const endMin = Math.min(volunteer.availableHoursEnd, need.requiredHoursEnd);
        const overlap = Math.max(0, endMin - startMax);
        const needDuration = Math.max(1, need.requiredHoursEnd - need.requiredHoursStart);
        const availabilityScore = Math.min(100, (overlap / needDuration) * 100);

        // 4. Urgency Boost (10%)
        const urgencyScore = (need.urgencyLevel / 5) * 100;

        // Calculate Total Match Score
        const matchScore = (0.4 * skillScore) + (0.3 * locationScore) + (0.2 * availabilityScore) + (0.1 * urgencyScore);

        if (matchScore > highestScore && matchScore >= 50) { // Threshold of 50
          highestScore = matchScore;
          bestMatch = volunteer;
        }
      }

      if (bestMatch) {
        // Create Allocation
        const allocation = new Allocation({
          needId: need._id,
          volunteerId: bestMatch._id,
          matchScore: highestScore
        });
        await allocation.save();

        // Update Need Status
        need.status = 'Allocated';
        await need.save();

        // Update Volunteer Status
        bestMatch.isAllocated = true;
        await bestMatch.save();

        // Remove volunteer from available list for next iteration
        const index = availableVolunteers.findIndex(v => v._id.toString() === bestMatch._id.toString());
        if (index > -1) {
          availableVolunteers.splice(index, 1);
        }

        newAllocations.push(allocation);
      }
    }

    res.json({ message: `Allocated ${newAllocations.length} tasks`, allocations: newAllocations });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

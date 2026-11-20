const Doctor = require('../models/doctor.model');
const { success, error } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const data = await Doctor.findAll();
    return success(res, data, 'Doctors fetched');
  } catch (err) {
    return error(res, 'Failed to fetch doctors');
  }
};

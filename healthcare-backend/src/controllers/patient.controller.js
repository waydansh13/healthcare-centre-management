const Patient = require('../models/patient.model');
const { success, error } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const data = await Patient.findAll();
    return success(res, data, 'Patients fetched');
  } catch (err) {
    return error(res, 'Failed to fetch patients');
  }
};

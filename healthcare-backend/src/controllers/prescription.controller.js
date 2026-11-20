const Prescription = require('../models/prescription.model');
const { success, error } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const data = await Prescription.findAll();
    return success(res, data, 'Prescriptions fetched');
  } catch (err) {
    return error(res, 'Failed to fetch prescriptions');
  }
};

const MedicalRecord = require('../models/medicalrecord.model');
const { success, error } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const data = await MedicalRecord.findAll();
    return success(res, data, 'Medical records fetched');
  } catch (err) {
    return error(res, 'Failed to fetch medical records');
  }
};

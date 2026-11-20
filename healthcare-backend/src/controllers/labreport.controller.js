const LabReport = require('../models/labreport.model');
const { success, error } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const data = await LabReport.findAll();
    return success(res, data, 'Lab reports fetched');
  } catch (err) {
    return error(res, 'Failed to fetch lab reports');
  }
};

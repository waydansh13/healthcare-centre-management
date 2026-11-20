const Department = require('../models/department.model');
const { success, error } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const data = await Department.findAll();
    return success(res, data, 'Departments fetched');
  } catch (err) {
    return error(res, 'Failed to fetch departments');
  }
};

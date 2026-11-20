const Admin = require('../models/admin.model');
const { success, error } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const data = await Admin.findAll();
    return success(res, data, 'Admins fetched');
  } catch (err) {
    return error(res, 'Failed to fetch admins');
  }
};

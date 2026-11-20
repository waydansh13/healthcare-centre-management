const Lab = require('../models/lab.model');
const { success, error } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const data = await Lab.findAll();
    return success(res, data, 'Labs fetched');
  } catch (err) {
    return error(res, 'Failed to fetch labs');
  }
};

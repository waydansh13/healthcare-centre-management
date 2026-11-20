const Surgery = require('../models/surgery.model');
const { success, error } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const data = await Surgery.findAll();
    return success(res, data, 'Surgeries fetched');
  } catch (err) {
    return error(res, 'Failed to fetch surgeries');
  }
};

const Disease = require('../models/disease.model');
const { success, error } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const data = await Disease.findAll();
    return success(res, data, 'Diseases fetched');
  } catch (err) {
    return error(res, 'Failed to fetch diseases');
  }
};

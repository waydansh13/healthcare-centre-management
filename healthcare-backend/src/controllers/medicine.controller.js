const Medicine = require('../models/medicine.model');
const { success, error } = require('../utils/response');

exports.lowStock = async (req, res) => {
  try {
    const data = await Medicine.findLowStock();
    return success(res, data, 'Low stock medicines');
  } catch (err) {
    return error(res, 'Failed to fetch medicines');
  }
};

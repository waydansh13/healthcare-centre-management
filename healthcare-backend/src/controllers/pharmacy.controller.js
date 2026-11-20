const Pharmacy = require('../models/pharmacy.model');
const { success, error } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const data = await Pharmacy.findAll();
    return success(res, data, 'Pharmacies fetched');
  } catch (err) {
    return error(res, 'Failed to fetch pharmacies');
  }
};

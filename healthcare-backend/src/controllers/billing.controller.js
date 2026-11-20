const Billing = require('../models/billing.model');
const { success, error } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const data = await Billing.findAll();
    return success(res, data, 'Billing records fetched');
  } catch (err) {
    return error(res, 'Failed to fetch billing records');
  }
};

const Appointment = require('../models/appointment.model');
const { success, error } = require('../utils/response');

exports.today = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0,0,0,0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate()+1);

    const data = await Appointment.findToday(today, tomorrow);
    return success(res, data, "Today's appointments");
  } catch (err) {
    return error(res, 'Failed to fetch appointments');
  }
};

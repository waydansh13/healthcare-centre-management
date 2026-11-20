const db = require('../config/db');
exports.findToday = async (startDate, endDate) => {
  const [rows] = await db.query('SELECT * FROM appointments WHERE date >= ? AND date < ? LIMIT 500', [startDate, endDate]);
  return rows;
};

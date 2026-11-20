const db = require('../config/db');

exports.findLowStock = async (threshold = 10) => {
  const [rows] = await db.query('SELECT * FROM medicines WHERE stock <= ? LIMIT 100', [threshold]);
  return rows;
};

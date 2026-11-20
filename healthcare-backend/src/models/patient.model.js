const db = require('../config/db');

exports.findAll = async () => {
  const [rows] = await db.query('SELECT * FROM patients LIMIT 100');
  return rows;
};

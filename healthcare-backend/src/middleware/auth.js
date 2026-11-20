const admin = require('../config/firebase');
const { error } = require('../utils/response');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return error(res, 'No authorization header', 401);

  const token = authHeader.split(' ')[1];
  if (!token) return error(res, 'Invalid authorization header', 401);

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return error(res, 'Unauthorized', 401);
  }
};

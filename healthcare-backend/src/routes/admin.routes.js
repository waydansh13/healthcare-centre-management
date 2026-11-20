const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');
const auth = require('../middleware/auth');

router.get('/admins', auth, AdminController.getAll);

module.exports = router;

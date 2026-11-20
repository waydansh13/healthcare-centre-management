const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/department.controller');
const auth = require('../middleware/auth');

router.get('/departments', auth, DepartmentController.getAll);

module.exports = router;

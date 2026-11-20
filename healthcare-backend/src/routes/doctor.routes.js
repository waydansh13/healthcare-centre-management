const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/doctor.controller');
const auth = require('../middleware/auth');

router.get('/doctors', auth, DoctorController.getAll);

module.exports = router;

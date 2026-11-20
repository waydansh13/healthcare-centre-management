const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/appointment.controller');
const auth = require('../middleware/auth');

router.get('/appointments/today', auth, AppointmentController.today);

module.exports = router;

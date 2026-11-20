const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/patient.controller');
const auth = require('../middleware/auth');

router.get('/patients', auth, PatientController.getAll);

module.exports = router;

const express = require('express');
const router = express.Router();
const MedicalRecordController = require('../controllers/medicalrecord.controller');
const auth = require('../middleware/auth');

router.get('/medical-records', auth, MedicalRecordController.getAll);

module.exports = router;

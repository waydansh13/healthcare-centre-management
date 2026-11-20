const express = require('express');
const router = express.Router();
const PrescriptionController = require('../controllers/prescription.controller');
const auth = require('../middleware/auth');

router.get('/prescriptions', auth, PrescriptionController.getAll);

module.exports = router;

const express = require('express');
const router = express.Router();
const LabReportController = require('../controllers/labreport.controller');
const auth = require('../middleware/auth');

router.get('/labreports', auth, LabReportController.getAll);

module.exports = router;

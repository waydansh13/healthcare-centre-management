const express = require('express');
const router = express.Router();
const PharmacyController = require('../controllers/pharmacy.controller');
const auth = require('../middleware/auth');

router.get('/pharmacies', auth, PharmacyController.getAll);

module.exports = router;

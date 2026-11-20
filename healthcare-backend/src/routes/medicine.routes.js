const express = require('express');
const router = express.Router();
const MedicineController = require('../controllers/medicine.controller');
const auth = require('../middleware/auth');

router.get('/medicines/low-stock', auth, MedicineController.lowStock);

module.exports = router;

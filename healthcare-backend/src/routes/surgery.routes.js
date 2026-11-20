const express = require('express');
const router = express.Router();
const SurgeryController = require('../controllers/surgery.controller');
const auth = require('../middleware/auth');

router.get('/surgeries', auth, SurgeryController.getAll);

module.exports = router;

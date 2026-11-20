const express = require('express');
const router = express.Router();
const LabController = require('../controllers/lab.controller');
const auth = require('../middleware/auth');

router.get('/labs', auth, LabController.getAll);

module.exports = router;

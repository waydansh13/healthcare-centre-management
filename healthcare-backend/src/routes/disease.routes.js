const express = require('express');
const router = express.Router();
const DiseaseController = require('../controllers/disease.controller');
const auth = require('../middleware/auth');

router.get('/diseases', auth, DiseaseController.getAll);

module.exports = router;

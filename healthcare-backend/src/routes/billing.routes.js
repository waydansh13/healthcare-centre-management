const express = require('express');
const router = express.Router();
const BillingController = require('../controllers/billing.controller');
const auth = require('../middleware/auth');

router.get('/billing', auth, BillingController.getAll);

module.exports = router;

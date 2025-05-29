const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/summary', dashboardController.getSummary);
router.get('/user-docs-stats', dashboardController.getUserDocsStats);
router.get('/alerts', dashboardController.getAlerts);

module.exports = router;

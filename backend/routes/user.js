const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/clients', userController.findAllClients);
router.get('/:id', userController.findOne);


module.exports = router;

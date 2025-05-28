const express = require('express');
const documentController = require('../controllers/documentController');

const router = express.Router();

router.get('/', documentController.findAll);
router.post('/version/:id/', documentController.addVersion);
router.get('/:id', documentController.findOne);
router.post('/', documentController.create);
router.put('/:id', documentController.update);
router.delete('/:id', documentController.archive);

module.exports = router;

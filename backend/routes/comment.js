const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

router.post('/', commentController.create);
router.get("/version/:version_id", commentController.fetchCommentsByDocumentVersionId);


module.exports = router;

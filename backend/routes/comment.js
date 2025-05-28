const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comentários
 *   description: Endpoints para gerenciamento de comentários por versão de documento
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Cria um novo comentário para uma versão de documento
 *     tags: [Comentários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - document_id
 *               - version_id
 *             properties:
 *               content:
 *                 type: string
 *               document_id:
 *                 type: string
 *               version_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso
 *       400:
 *         description: Dados inválidos ou incompletos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', commentController.create);

/**
 * @swagger
 * /comments/version/{version_id}:
 *   get:
 *     summary: Lista todos os comentários de uma versão específica de documento
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: version_id
 *         required: true
 *         description: ID da versão do documento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de comentários retornada com sucesso
 *       500:
 *         description: Erro interno ao buscar os comentários
 */
router.get("/version/:version_id", commentController.fetchCommentsByDocumentVersionId);

module.exports = router;

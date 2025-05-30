const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comentários
 *   description: Endpoints para gerenciamento de comentários de documentos e grupos de documentos
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Cria um novo comentário para documento ou grupo de documentos
 *     tags: [Comentários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Comentário de teste"
 *               document_id:
 *                 type: string
 *                 description: ID do documento (opcional se group_document_id fornecido)
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               group_document_id:
 *                 type: string
 *                 description: ID do grupo de documentos (opcional se document_id fornecido)
 *                 example: "223e4567-e89b-12d3-a456-426614174111"
 *               version_id:
 *                 type: string
 *                 description: ID da versão do documento (aplicável somente se document_id usado)
 *                 example: "323e4567-e89b-12d3-a456-426614174222"
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/CommentDocument'
 *                 - $ref: '#/components/schemas/CommentGroupDocument'
 *       400:
 *         description: Dados inválidos ou incompletos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', commentController.create);

/**
 * @swagger
 * /comments/document/{document_id}:
 *   get:
 *     summary: Lista todos os comentários de um documento
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: document_id
 *         required: true
 *         description: ID do documento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de comentários do documento retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CommentDocument'
 *       400:
 *         description: ID do documento não fornecido
 *       500:
 *         description: Erro ao buscar comentários
 */
router.get('/document/:document_id', commentController.fetchCommentsByDocumentId);

/**
 * @swagger
 * /comments/group-document/{group_document_id}:
 *   get:
 *     summary: Lista todos os comentários de um grupo de documentos
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: group_document_id
 *         required: true
 *         description: ID do grupo de documentos
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de comentários do grupo retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CommentGroupDocument'
 *       400:
 *         description: ID do grupo de documentos não fornecido
 *       500:
 *         description: Erro ao buscar comentários
 */
router.get('/group-document/:group_document_id', commentController.fetchCommentsByGroupDocumentId);


/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Remove um comentário pelo ID (documento ou grupo de documentos)
 *     tags: [Comentários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do comentário a ser removido (UUID)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentário removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comentário de documento removido com sucesso
 *       404:
 *         description: Comentário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comentário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', commentController.delete);

module.exports = router;

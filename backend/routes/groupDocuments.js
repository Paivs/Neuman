const express = require('express');
const groupDocumentController = require('../controllers/groupDocumentController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Groupo Documentos
 *   description: Endpoints para gerenciamento de grupo de documentos
 */

/**
 * @swagger
 * /group-documents:
 *   get:
 *     summary: Lista todos os grupos de documentos do usuário dono (não arquivados)
 *     tags: [Groupo Documentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de grupos de documentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GroupDocument'
 *       500:
 *         description: Erro ao buscar grupos de documentos
 */
router.get("/", groupDocumentController.findByOwner);

/**
 * @swagger
 * /group-documents/{id}:
 *   get:
 *     summary: Busca um grupo de documentos por ID (com clientes, permissões, comentários e caso)
 *     tags: [Groupo Documentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do grupo de documentos (UUID)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Grupo de documentos encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupDocumentDetail'
 *       404:
 *         description: Grupo de documentos não encontrado
 *       500:
 *         description: Erro ao buscar grupo de documentos
 */
router.get("/:id", groupDocumentController.findOne);

/**
 * @swagger
 * /group-documents:
 *   post:
 *     summary: Cria um novo grupo de documentos
 *     tags: [Groupo Documentos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados para criação do grupo de documentos
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Grupo de contratos
 *               description:
 *                 type: string
 *                 example: Documentos de contratos de clientes
 *               case_id:
 *                 type: string
 *                 format: uuid
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *               client_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 example:
 *                   - c1e4567e-e89b-12d3-a456-426614174abc
 *                   - c2e4567e-e89b-12d3-a456-426614174def
 *     responses:
 *       201:
 *         description: Grupo de documentos criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupDocument'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", groupDocumentController.create);

/**
 * @swagger
 * /group-documents/{id}:
 *   put:
 *     summary: Atualiza um grupo de documentos
 *     tags: [Groupo Documentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do grupo a atualizar (UUID)
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dados para atualização do grupo de documentos
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Novo título
 *               description:
 *                 type: string
 *                 example: Nova descrição
 *               case_id:
 *                 type: string
 *                 format: uuid
 *               client_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *     responses:
 *       200:
 *         description: Grupo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupDocument'
 *       404:
 *         description: Grupo não encontrado
 *       500:
 *         description: Erro ao atualizar grupo
 */
router.put("/:id", groupDocumentController.update);

/**
 * @swagger
 * /group-documents/{id}:
 *   delete:
 *     summary: Arquiva um grupo de documentos (soft delete)
 *     tags: [Groupo Documentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do grupo a arquivar (UUID)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Grupo arquivado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Grupo de documentos arquivado com sucesso
 *       404:
 *         description: Grupo não encontrado
 *       500:
 *         description: Erro ao arquivar grupo
 */
router.delete("/:id", groupDocumentController.archive);

module.exports = router;

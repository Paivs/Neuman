const express = require('express');
const caseController = require('../controllers/caseController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Casos
 *   description: Endpoints para gerenciamento de casos
 */

/**
 * @swagger
 * /cases:
 *   get:
 *     summary: Lista todos os casos com clientes vinculados
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de casos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Case'
 *       500:
 *         description: Erro ao listar casos
 */
router.get('/', caseController.findAll);

/**
 * @swagger
 * /cases/{id}:
 *   get:
 *     summary: Busca um caso por ID com clientes vinculados
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do caso (UUID)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Caso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Case'
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro ao buscar caso
 */
router.get('/:id', caseController.findOne);

/**
 * @swagger
 * /cases:
 *   post:
 *     summary: Cria um novo caso
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados para criar um caso
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Caso Judicial 123
 *               description:
 *                 type: string
 *                 example: Caso referente ao cliente X
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
 *         description: Caso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Case'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao criar caso
 */
router.post('/', caseController.create);

/**
 * @swagger
 * /cases/{id}:
 *   put:
 *     summary: Atualiza um caso existente
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do caso a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dados para atualização do caso
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Caso Atualizado
 *               description:
 *                 type: string
 *                 example: Descrição atualizada do caso
 *               client_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Case'
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro ao atualizar caso
 */
router.put('/:id', caseController.update);

/**
 * @swagger
 * /cases/{id}:
 *   delete:
 *     summary: Deleta um caso (hard delete)
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do caso a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Caso deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Caso deletado com sucesso
 *       404:
 *         description: Caso não encontrado
 *       500:
 *         description: Erro ao deletar caso
 */
router.delete('/:id', caseController.delete);

module.exports = router;

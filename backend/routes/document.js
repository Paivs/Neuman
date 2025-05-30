const express = require('express');
const documentController = require('../controllers/documentController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Documentos
 *   description: Endpoints para gerenciamento de documentos
 */


/**
 * @swagger
 * /documents/version/{id}:
 *   post:
 *     summary: Adiciona uma nova versão a um documento existente
 *     tags: [Documentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do documento
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Nova versão criada com sucesso
 */
router.post('/version/:id/', documentController.addVersion);

/**
 * @swagger
 * /documents/{id}:
 *   get:
 *     summary: Busca um documento pelo ID
 *     tags: [Documentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do documento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Documento encontrado com sucesso
 */
router.get('/:id', documentController.findOne);

/**
 * @swagger
 * /documents:
 *   post:
 *     summary: Cria um novo documento
 *     tags: [Documentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Documento criado com sucesso
 */
router.post('/', documentController.create);

/**
 * @swagger
 * /documents/{id}:
 *   put:
 *     summary: Atualiza um documento existente
 *     tags: [Documentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do documento
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Documento atualizado com sucesso
 */
router.put('/:id', documentController.update);

/**
 * @swagger
 * /documents/{id}:
 *   delete:
 *     summary: Arquiva (deleta logicamente) um documento
 *     tags: [Documentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do documento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Documento arquivado com sucesso
 */
router.delete('/:id', documentController.archive);

module.exports = router;

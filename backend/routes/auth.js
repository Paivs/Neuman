const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints de login e registro de usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Von Neuman
 *               email:
 *                 type: string
 *                 format: email
 *                 example: neuman@mail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: neuman@123
 *               role:
 *                 type: string
 *                 example: lawyer
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 role:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             example:
 *               message: "Email já cadastrado"
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: neuman@mail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: neuman@123
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna token e dados do usuário
 *         content:
 *           application/json:
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               user:
 *                 id: "uuid-do-usuario"
 *                 name: "Von Neuman"
 *                 email: "neuman@mail.com"
 *                 role: "advogado"
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             example:
 *               message: "Email ou senha incorretos"
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/login", authController.login);

module.exports = router;

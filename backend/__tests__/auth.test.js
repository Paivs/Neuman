const request = require('supertest');
const app = require('../app');
const { User } = require('../models');

describe('Autenticação', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  describe('POST /auth/register', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          name: 'Teste User',
          email: 'teste@example.com',
          password: 'senha123'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('userId');
      expect(response.body.message).toBe('Usuário criado com sucesso');
    });

    it('deve falhar ao registrar usuário com email duplicado', async () => {
      await User.create({
        name: 'Existing User',
        email: 'teste@example.com',
        password_hash: 'hash123',
        role: 'lawyer'
      });

      const response = await request(app)
        .post('/auth/register')
        .send({
          name: 'Teste User',
          email: 'teste@example.com',
          password: 'senha123'
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/auth/register')
        .send({
          name: 'Teste User',
          email: 'teste@example.com',
          password: 'senha123'
        });
    });

    it('deve fazer login com sucesso', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'teste@example.com',
          password: 'senha123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('email', 'teste@example.com');
    });

    it('deve falhar com credenciais inválidas', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'teste@example.com',
          password: 'senha_errada'
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Credenciais inválidas');
    });
  });
}); 
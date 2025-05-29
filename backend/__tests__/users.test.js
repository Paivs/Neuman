const request = require('supertest');
const app = require('../app');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_default';

let token;
let userId;

beforeAll(async () => {
  token = jwt.sign({
    id: 'user-1234',
    email: 'test@example.com',
    role: 'lawyer'
  }, JWT_SECRET, { expiresIn: '1h' });

  // Criar um usuário para testes
  const user = await User.create({
    name: 'Usuário Teste',
    email: 'usuario@example.com',
    password_hash: 'hash123',
    role: 'lawyer'
  });
  userId = user.id;
});

describe('Users Controller', () => {
  describe('GET /users/clients', () => {
    it('deve listar todos os clientes do usuário', async () => {
      const response = await request(app)
        .get('/users/clients')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('deve falhar sem autenticação', async () => {
      const response = await request(app)
        .get('/users/clients');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /users/:id', () => {
    it('deve buscar um usuário específico', async () => {
      const response = await request(app)
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', userId);
      expect(response.body).toHaveProperty('name', 'Usuário Teste');
      expect(response.body).toHaveProperty('email', 'usuario@example.com');
      expect(response.body).not.toHaveProperty('password_hash');
    });

    it('deve retornar 404 para usuário inexistente', async () => {
      const response = await request(app)
        .get('/users/usuario-inexistente')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });

    it('deve falhar sem autenticação', async () => {
      const response = await request(app)
        .get(`/users/${userId}`);

      expect(response.status).toBe(401);
    });
  });
}); 
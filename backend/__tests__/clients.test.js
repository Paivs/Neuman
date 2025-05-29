const request = require('supertest');
const app = require('../app');
// const { Client } = require('../models');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_default';

let token;
let clientId;

beforeAll(async () => {
  token = jwt.sign({
    id: 'user-1234',
    email: 'test@example.com',
    role: 'lawyer'
  }, JWT_SECRET, { expiresIn: '1h' });
});

describe('Clients Controller', () => {
  describe('POST /clients', () => {
    it('deve criar um novo cliente com sucesso', async () => {
      const response = await request(app)
        .post('/clients')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Cliente Teste',
          email: 'cliente@example.com',
          phone: '11999999999',
          address: 'Rua Teste, 123'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Cliente Teste');
      expect(response.body.email).toBe('cliente@example.com');
      
      clientId = response.body.id;
    });

    it('deve falhar ao criar cliente sem nome', async () => {
      const response = await request(app)
        .post('/clients')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'cliente@example.com',
          phone: '11999999999'
        });

      expect(response.status).toBe(400);
    });

    it('deve falhar ao criar cliente com email duplicado', async () => {
      const response = await request(app)
        .post('/clients')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Outro Cliente',
          email: 'cliente@example.com',
          phone: '11999999999'
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /clients', () => {
    it('deve listar todos os clientes', async () => {
      const response = await request(app)
        .get('/clients')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('email');
    });
  });

  describe('GET /clients/:id', () => {
    it('deve buscar um cliente específico', async () => {
      const response = await request(app)
        .get(`/clients/${clientId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', clientId);
      expect(response.body.name).toBe('Cliente Teste');
      expect(response.body.email).toBe('cliente@example.com');
    });

    it('deve retornar 404 para cliente inexistente', async () => {
      const response = await request(app)
        .get('/clients/cliente-inexistente')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });
}); 
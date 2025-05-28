const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_default';

let token;
let createdDocId;

beforeAll(async () => {
  await sequelize.sync({ force: true }); // cuidado: limpa o DB

  token = jwt.sign({
    id: 'user-1234',
    // tenant_id: 'tenant-1234',
    email: 'test@example.com'
  }, JWT_SECRET, { expiresIn: '1h' });
});

describe('Document Controller', () => {
  test('Cria um documento com versão e permissão', async () => {
    const res = await request(app)
      .post('/documents')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Documento de Teste',
        description: 'Descrição do documento',
        file_url: 'https://example.com/file.pdf'  // obrigatório para criação da versão
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Documento de Teste');
    expect(res.body).toHaveProperty('versions');
    expect(Array.isArray(res.body.versions)).toBe(true);
    expect(res.body.versions.length).toBe(1);
    expect(res.body.versions[0]).toHaveProperty('file_url', 'https://example.com/file.pdf');

    expect(res.body).toHaveProperty('permissions');
    expect(Array.isArray(res.body.permissions)).toBe(true);
    expect(res.body.permissions.length).toBe(1);
    expect(res.body.permissions[0]).toHaveProperty('permission', 'edit');

    createdDocId = res.body.id;
  });

  test('Lista documentos do usuário', async () => {
    const res = await request(app)
      .get('/documents')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);

    // Verificar se as versões e permissões vêm na lista
    const doc = res.body.find(d => d.id === createdDocId);
    expect(doc).toBeDefined();
    expect(doc).toHaveProperty('versions');
    expect(doc).toHaveProperty('permissions');
  });

  test('Busca um documento específico', async () => {
    const res = await request(app)
      .get(`/documents/${createdDocId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', createdDocId);
    expect(res.body).toHaveProperty('versions');
    expect(res.body).toHaveProperty('permissions');
    expect(res.body).toHaveProperty('owner');
    expect(res.body.owner).toHaveProperty('email', 'test@example.com');
  });

  test('Atualiza um documento', async () => {
    const res = await request(app)
      .put(`/documents/${createdDocId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Novo Título'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Novo Título');

    // Garantir que versões e permissões continuem disponíveis
    expect(res.body).toHaveProperty('versions');
    expect(res.body).toHaveProperty('permissions');
  });

  test('Arquiva um documento', async () => {
    const res = await request(app)
      .patch(`/documents/${createdDocId}/archive`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Documento arquivado com sucesso');
  });

  test('Documento arquivado não aparece na listagem', async () => {
    const res = await request(app)
      .get('/documents')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    // Documento arquivado não deve aparecer
    const doc = res.body.find(d => d.id === createdDocId);
    expect(doc).toBeUndefined();
  });
});

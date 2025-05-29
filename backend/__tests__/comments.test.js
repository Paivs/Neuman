const request = require('supertest');
const app = require('../app');
const { Document, DocumentVersion } = require('../models');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_default';

let token;
let documentId;
let versionId;

beforeAll(async () => {
  // Criar token de teste
  token = jwt.sign({
    id: 'user-1234',
    email: 'test@example.com'
  }, JWT_SECRET, { expiresIn: '1h' });

  // Criar documento e versão para testar comentários
  const document = await Document.create({
    title: 'Documento Teste',
    description: 'Descrição teste',
    owner_id: 'user-1234'
  });
  documentId = document.id;

  const version = await DocumentVersion.create({
    document_id: documentId,
    version_number: 1,
    file_url: 'https://example.com/file.pdf'
  });
  versionId = version.id;
});

describe('Comments Controller', () => {
  describe('POST /comments', () => {
    it('deve criar um novo comentário com sucesso', async () => {
      const response = await request(app)
        .post('/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Comentário de teste',
          document_id: documentId,
          version_id: versionId
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.content).toBe('Comentário de teste');
      expect(response.body.document_id).toBe(documentId);
      expect(response.body.version_id).toBe(versionId);
    });

    it('deve falhar ao criar comentário sem conteúdo', async () => {
      const response = await request(app)
        .post('/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          document_id: documentId,
          version_id: versionId
        });

      expect(response.status).toBe(400);
    });

    it('deve falhar ao criar comentário para versão inexistente', async () => {
      const response = await request(app)
        .post('/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Comentário de teste',
          document_id: documentId,
          version_id: 'versao-inexistente'
        });

      expect(response.status).toBe(404);
    });
  });

  describe('GET /comments/version/:version_id', () => {
    it('deve listar comentários de uma versão', async () => {
      // Criar alguns comentários primeiro
      await request(app)
        .post('/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Comentário 1',
          document_id: documentId,
          version_id: versionId
        });

      await request(app)
        .post('/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Comentário 2',
          document_id: documentId,
          version_id: versionId
        });

      const response = await request(app)
        .get(`/comments/version/${versionId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
      expect(response.body[0]).toHaveProperty('content');
      expect(response.body[0]).toHaveProperty('user');
    });

    it('deve retornar lista vazia para versão sem comentários', async () => {
      const response = await request(app)
        .get('/comments/version/versao-sem-comentarios')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });
  });
}); 
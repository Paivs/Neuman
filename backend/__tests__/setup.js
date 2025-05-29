require('dotenv').config();
const { sequelize } = require('../models');

// Configurações específicas para teste
process.env.NODE_ENV = 'test';
process.env.DB_NAME = 'neuman_test';
process.env.JWT_SECRET = 'test_secret_key';

beforeAll(async () => {
  // Força a conexão com o banco de dados de teste
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados de teste estabelecida.');
    
    // Sincroniza o banco de dados de teste (recria todas as tabelas)
    await sequelize.sync({ force: true });
    console.log('Banco de dados sincronizado.');
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados de teste:', error);
    throw error;
  }
});

beforeEach(async () => {
  // Limpa todas as tabelas antes de cada teste
  const models = Object.values(sequelize.models);
  for (const model of models) {
    await model.destroy({ where: {}, force: true });
  }
});

afterAll(async () => {
  // Fecha a conexão com o banco de dados
  await sequelize.close();
}); 
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentação da API usando Swagger',
    },
    servers: [
      {
        url: 'http://localhost:8080', // URL base da API
      },
    ],
  },
  apis: ['./routes/*.js'], // Caminho dos arquivos que possuem anotações
};

const specs = swaggerJsDoc(options);

module.exports = specs;

const express = require('express');                 //express
const errorHandler = require('./middlewares/errorHandler'); 
require('./config/database').authenticate()         //BD MYSQL

const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');


const app = express();
app.use(express.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs)); //documentação em tempo real, serve para testes também

app.use(errorHandler);    //tratamento de erros

app.listen(4000, () => {
  console.log('Servidor rodando na porta 4000');
});
const express = require('express');                 //express
const errorHandler = require('./middlewares/errorHandler'); 
require('./config/database').authenticate();         //BD postgres
const cors = require("cors");

//import rotas
const authRouter = require('./routes/auth');
const document = require('./routes/document');
const groupDocuments = require('./routes/groupDocuments');
const comment = require('./routes/comment');
const user = require('./routes/user');
const dashboard = require('./routes/dashboard')
const cases = require('./routes/case')
const client = require('./routes/client');



const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

const authMiddleware = require('./middlewares/authMiddleware');


const app = express();
app.use(express.json());
app.use(cors());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs)); //documentação em tempo real, serve para testes também


app.use(errorHandler);    //tratamento de erros

app.use("/auth", authRouter); //precisa estar antes do middlware de auth

app.use(authMiddleware);

app.use("/users", user);
app.use("/cases", cases);
app.use("/group-documents", groupDocuments);
app.use("/documents", document);
app.use('/comments', comment);
app.use('/clients', client);
app.use('/dashboard', dashboard)



app.listen(8085, () => {
  console.log('Servidor rodando na porta 8085');
});


module.exports = app;
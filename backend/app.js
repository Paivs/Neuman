const express = require('express');                 //express
const errorHandler = require('./middlewares/errorHandler'); 
require('./config/database').authenticate()         //BD MYSQL
const authRouter = require('./routes/auth');
const document = require('./routes/document');
const comment = require('./routes/comment');
const user = require('./routes/user');
const cors = require("cors")
const client = require('./routes/client');



const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const authMiddleware = require('./middlewares/authMiddleware');


const app = express();
app.use(express.json());
app.use(cors())


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs)); //documentação em tempo real, serve para testes também


app.use(errorHandler);    //tratamento de erros

app.use("/auth", authRouter) //precisa estar antes do middlware de auth

app.use(authMiddleware)

app.use("/users", user)
app.use("/documents", document)
app.use('/comments', comment);
app.use('/clients', client);



app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});


module.exports = app;
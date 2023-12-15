import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './config/db.js';
import {router} from './routes/pessoas.js'

export const app = express();
const port = 3000;


// Configurando o middleware para analisar corpos de solicitação
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);


// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

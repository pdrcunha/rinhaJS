import express from 'express';
import { ControllerPessoa } from '../controller/ControllerPessoas.js';

export const router = express.Router()
const pessoasController = new ControllerPessoa();

router.post("/pessoas", (req, res, next) => {
    pessoasController.inserirPessoa(req,res);
});


router.get("/pessoas/:id", (req, res, next) => {
    pessoasController.lerPessoas(req,res);
});

router.get("/pessoas", (req, res, next) => {
    pessoasController.lerPessoasParam(req,res);
});

router.get("/contagem-pessoas", (req, res, next) => {
    pessoasController.contagemPessoas(req,res);
});
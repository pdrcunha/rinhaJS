import express from 'express';
import { ControllerPessoa } from '../controller/ControllerPessoas.js';

export const router = express.Router()
const pessoasController = new ControllerPessoa();

router.post("/pessoas",async (req, res, next) => {
   return await pessoasController.inserirPessoa(req,res);
});


router.get("/pessoas/:id", async(req, res, next) => {
    return await pessoasController.lerPessoas(req,res);
});

router.get("/pessoas",async (req, res, next) => {
    return await pessoasController.lerPessoasParam(req,res);
});

router.get("/contagem-pessoas",async (req, res, next) => {
    return  await pessoasController.contagemPessoas(req,res);
});
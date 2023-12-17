import { Sequelize, Op } from "sequelize";
import validator from "validator";

import Users from "../models/users.js";

export class ControllerPessoa {
    constructor() {

    }



    async inserirPessoa(req, res) {
        try {
            const dadosDoCorpo = req.body;

            // Validar os campos obrigatórios
            let { apelido, nome, nascimento, stack } = dadosDoCorpo;

            // Validar limites de tamanho para strings
            if (!apelido || !validator.isLength(apelido, { min: 1, max: 32 }) ||
                !nome || !validator.isLength(nome, { min: 1, max: 100 }) ||
                !nascimento || !validator.isDate(nascimento)) {
                return res.status(422).json({ error: 'Dados inválidos na requisição' });
            }

            // Validar o campo stack, se existir
            if (stack && (!Array.isArray(stack) || !stack.every(item => validator.isLength(item, { min: 1, max: 32 })))) {
                return res.status(422).json({ error: 'Stack inválido' });
            }

            const markedUser = await Users.findOne({
                where: {
                    apelido: apelido
                }
            });

            if (markedUser)  return res.status(422).json({ error: 'Apelido Duplicado' });

            stack = stack && Array.isArray(stack) ? JSON.stringify(stack) : '';

            const user = await Users.create({
                apelido: apelido,
                nome: nome,
                nascimento: nascimento,
                stack: stack,
            });

            // Retornar status code 201 e o header "Location"
            return res.status(201).header('Location', `/pessoas/${user.id}`).json({
                success: 'Pessoa criada com sucesso'
            });
        } catch (error) {
            console.error(error);
            return res.status(422).json({ "error": error });
        }
    }


    async lerPessoas(req, res) {
        const id = req.params.id; // Parâmetro da URL

        try {

            const pessoa = await Users.findByPk(id);

            if (!pessoa) {
                return res.status(404).json({ error: 'Pessoa não encontrada' });
            }

            return res.status(200).json(pessoa);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error });
        }
    }

    async lerPessoasParam(req, res) {
        const termoDeBusca = req.query.t;

        if (!termoDeBusca) {
            return res.status(400).json({ error: 'Parâmetro de busca não fornecido' });
        }

        try {
            // const pessoasEncontradas = await Users.findAll({
            //     where: {
            //         [Op.or]: [
            //             { stack: { [Op.like]: `%${termoDeBusca}%` } },
            //             { nome: { [Op.like]: `%${termoDeBusca}%` } },
            //             { apelido: { [Op.like]: `%${termoDeBusca}%` } }
            //         ],
            //     },
            // });


            res.status(200).json({"dd":"dd"});
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error });
        }
    }

    async contagemPessoas(req, res) {
        try {
            const totalPessoas = await Users.count();

            return res.status(200).json({ total: totalPessoas });
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error });
        }
    }

}
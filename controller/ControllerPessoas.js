import { Sequelize, Op } from "sequelize";

import Users from "../models/users.js";

export class ControllerPessoa {
    constructor() {

    }

    async inserirPessoa(req, res) {
        try {
            const dadosDoCorpo = req.body;

            // Validar os campos obrigatórios
            const { apelido, nome, nascimento, stack } = dadosDoCorpo;

            if (!apelido || !nome || !nascimento) {
                // Requisição inválida
                return res.status(422).json({ error: 'Dados inválidos na requisição' });
            }

            // Validar o campo stack, se existir
            if (stack && (!Array.isArray(stack) || stack.some(item => typeof item !== 'string'))) {
                // Requisição inválida para o vetor de stack
                return res.status(422).json({ error: 'Stack inválido' });
            }

            const id = await Users.create({
                apelido: dadosDoCorpo.apelido,
                nome: dadosDoCorpo.nome,
                nascimento: dadosDoCorpo.nascimento,
                stack: dadosDoCorpo.stack || [],
            })

            // Retornar status code 201 e o header "Location"
            res.status(201).header('Location', `/pessoas/${id}`).json({
                success: 'Pessoa criada com sucesso',
                id,
            });
        } catch (error) {
            return res.status(422).json({ error: 'Stack inválido' });
        }

    }


    async lerPessoas(req, res) {
        const id = req.params.id; // Parâmetro da URL

        try {
            const pessoa = await Users.findByPk(id);

            if (!pessoa) {
                return res.status(404).json({ error: 'Pessoa não encontrada' });
            }

            res.status(200).json(pessoa);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async lerPessoasParam(req, res) {
        const termoDeBusca = req.query.t;

        if (!termoDeBusca) {
            return res.status(400).json({ error: 'Parâmetro de busca não fornecido' });
        }

        try {
            const pessoasEncontradas = await Users.findAll({
                where: {

                    nome: { [Op.like]: `%${termoDeBusca}%` },
                    apelido: { [Op.like]: `%${termoDeBusca}%` },
                    stack: { [Op.like]: `%${termoDeBusca}%` },

                },
            });

            res.status(200).json(pessoasEncontradas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async contagemPessoas(req, res) {
        try {
            const totalPessoas = await Users.count();

            res.status(200).json({ total: totalPessoas });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

}
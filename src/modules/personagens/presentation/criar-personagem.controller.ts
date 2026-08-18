import { Request, Response } from "express";
import { CriarPersonagemUseCase } from "../application/criar-personagem.usecase";

export class CriarPersonagemController {
    constructor(private criarPersonagemUseCase: CriarPersonagemUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const dados = req.body;
            const usuarioId = (req as any).userId;
            const personagem = await this.criarPersonagemUseCase.executar(dados, usuarioId);
            return res.status(201).json(personagem);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
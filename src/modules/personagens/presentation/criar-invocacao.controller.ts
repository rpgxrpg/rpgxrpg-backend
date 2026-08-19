import { Request, Response } from "express";
import { CriarInvocacaoUseCase } from "../application/criar-invocacao.usecase";

export class CriarInvocacaoController {
    constructor(private criarInvocacaoUseCase: CriarInvocacaoUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const personagemPaiId = Number(req.params.personagemId);
            const dados = req.body;
            const quemCria = (req as any).userId;
            const invocacao = await this.criarInvocacaoUseCase.executar(personagemPaiId, dados, quemCria);
            return res.status(201).json(invocacao);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
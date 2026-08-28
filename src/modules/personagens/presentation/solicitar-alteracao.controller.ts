import { Request, Response } from "express";
import { SolicitarAlteracaoUseCase } from "../application/solicitar-alteracao.usecase";

export class SolicitarAlteracaoController {
    constructor(private solicitarAlteracaoUseCase: SolicitarAlteracaoUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const personagemId = Number(req.params.personagemId);
            const userId = (req as any).userId;
            const alteracao = await this.solicitarAlteracaoUseCase.executar(personagemId, userId, req.body);
            return res.status(201).json(alteracao);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

import { Request, Response } from "express";
import { AprovarAlteracaoUseCase } from "../application/aprovar-alteracao.usecase";

export class AprovarAlteracaoController {
    constructor(private aprovarAlteracaoUseCase: AprovarAlteracaoUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const alteracaoId = Number(req.params.alteracaoId);
            const userId = (req as any).userId;
            await this.aprovarAlteracaoUseCase.executar(alteracaoId, userId);
            return res.status(200).json({ message: "Alteracao aprovada com sucesso" });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

import { Request, Response } from "express";
import { RejeitarAlteracaoUseCase } from "../application/rejeitar-alteracao.usecase";

export class RejeitarAlteracaoController {
    constructor(private rejeitarAlteracaoUseCase: RejeitarAlteracaoUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const alteracaoId = Number(req.params.alteracaoId);
            const userId = (req as any).userId;
            await this.rejeitarAlteracaoUseCase.executar(alteracaoId, userId);
            return res.status(200).json({ message: "Alteracao rejeitada com sucesso" });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

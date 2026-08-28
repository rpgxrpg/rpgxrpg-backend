import { Request, Response } from "express";
import { ListarAlteracoesPendentesUseCase } from "../application/listar-alteracoes-pendentes.usecase";

export class ListarAlteracoesPendentesController {
    constructor(private listarAlteracoesPendentesUseCase: ListarAlteracoesPendentesUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const campanhaId = Number(req.params.campanhaId);
            const userId = (req as any).userId;
            const alteracoes = await this.listarAlteracoesPendentesUseCase.executar(campanhaId, userId);
            return res.status(200).json(alteracoes);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

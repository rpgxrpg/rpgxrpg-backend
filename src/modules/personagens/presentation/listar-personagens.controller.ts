import { Request, Response } from "express";
import { ListarPersonagensUseCase } from "../application/listar-personagens.usecase";

export class ListarPersonagensController {
    constructor(private listarPersonagensUseCase: ListarPersonagensUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const campanhaId = Number(req.params.campanhaId);
            const userId = (req as any).userId;
            const personagens = await this.listarPersonagensUseCase.executar(campanhaId, userId);
            return res.status(200).json(personagens);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

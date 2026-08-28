import { Request, Response } from "express";
import { ListarPersonagensPendentesUseCase } from "../application/listar-personagens-pendentes.usecase";

export class ListarPersonagensPendentesController {
    constructor(private listarPersonagensPendentesUseCase: ListarPersonagensPendentesUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const campanhaId = Number(req.params.campanhaId);
            const userId = (req as any).userId;
            const personagens = await this.listarPersonagensPendentesUseCase.executar(campanhaId, userId);
            return res.status(200).json(personagens);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

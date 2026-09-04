import { Request, Response } from "express";
import { ListarArmasUseCase } from "../application/listar-armas.usecase";

export class ListarArmasController {
    constructor(private listarArmasUseCase: ListarArmasUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const campanhaId = Number(req.params.campanhaId);
            const usuarioId = (req as any).userId;
            const armas = await this.listarArmasUseCase.executar(campanhaId, usuarioId);
            return res.status(200).json(armas);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

import { Request, Response } from "express";
import { CriarArmaUseCase } from "../application/criar-arma.usecase";

export class CriarArmaController {
    constructor(private criarArmaUseCase: CriarArmaUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const campanhaId = Number(req.params.campanhaId);
            const usuarioId = (req as any).userId;
            const arma = await this.criarArmaUseCase.executar({ ...req.body, campanha_id: campanhaId }, usuarioId);
            return res.status(201).json(arma);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
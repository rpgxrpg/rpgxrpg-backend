import { Request, Response } from "express";
import { CriarNpcUseCase } from "../application/criar-npc.usecase";

export class CriarNpcController {
    constructor(private criarNpcUseCase: CriarNpcUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const campanhaId = Number(req.params.campanhaId);
            const dados = req.body;
            const quemCria = (req as any).userId;
            const npc = await this.criarNpcUseCase.executar(campanhaId, dados, quemCria);
            return res.status(201).json(npc);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
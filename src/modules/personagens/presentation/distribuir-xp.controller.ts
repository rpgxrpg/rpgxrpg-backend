import { Request, Response } from "express";
import { DistribuirXpUseCase } from "../application/distribuir-xp.usecase";

export class DistribuirXpController {
    constructor(private distribuirXpUseCase: DistribuirXpUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const personagemId = Number(req.params.personagemId);
            const quemDistribui = (req as any).userId;
            const { quantidade, tipo } = req.body;
            await this.distribuirXpUseCase.executar(personagemId, quemDistribui, quantidade, tipo);
            return res.status(200).json({ message: "XP distribuido com sucesso" });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
import { Request, Response } from "express";
import { RejeitarPersonagemUseCase } from "../application/rejeitar-personagem.usecase";

export class RejeitarPersonagemController {
    constructor(private rejeitarPersonagemUseCase: RejeitarPersonagemUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const personagemId = Number(req.params.personagemId);
            const quemRejeita = (req as any).userId;
            await this.rejeitarPersonagemUseCase.executar(personagemId, quemRejeita);
            return res.status(200).json({ message: "Personagem rejeitado com sucesso" });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
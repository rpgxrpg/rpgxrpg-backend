import { Request, Response } from "express";
import { AprovarPersonagemUseCase } from "../application/aprovar-personagem.usecase";

export class AprovarPersonagemController {
    constructor(private aprovarPersonagemUseCase: AprovarPersonagemUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const personagemId = Number(req.params.personagemId);
            const quemAprova = (req as any).userId;
            await this.aprovarPersonagemUseCase.executar(personagemId, quemAprova);
            return res.status(200).json({ message: "Personagem aprovado com sucesso" });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
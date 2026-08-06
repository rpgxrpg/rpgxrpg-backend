import { Request, Response } from "express";
import { ConvidarJogadorUseCase } from "../application/convidar-jogador.usecase";

export class ConvidarJogadorController {
    constructor(private convidarJogadorUseCase: ConvidarJogadorUseCase) {}
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const campanhaId = Number(req.params.campanhaId);
            const quemConvida = (req as any).userId;
            const email = req.body.email;
            const convite = await this.convidarJogadorUseCase.executar(campanhaId, email, quemConvida);
            return res.status(201).json(convite);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

}
import { AceitarConviteUseCase } from "../application/aceitar-convite.usecase";
import { Request, Response } from "express";

export class AceitarConviteController {
    constructor(private aceitarConviteUseCase: AceitarConviteUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const conviteId = Number(req.params.conviteId);
            const quemAceita = (req as any).userId;
            await this.aceitarConviteUseCase.executar(conviteId, quemAceita)
            return res.status(200).json({ message: "Convite aceito com sucesso" });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }   
    }
}
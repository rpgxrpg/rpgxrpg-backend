import { RecusarConviteUseCase } from "../application/recusar-convite.usecase";
import { Request, Response } from "express";

export class RecusarConviteController {
    constructor(private recusarConviteUseCase: RecusarConviteUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const conviteId = Number(req.params.conviteId);
            const quemRecusa = (req as any).userId;
            await this.recusarConviteUseCase.executar(conviteId, quemRecusa)
            return res.status(200).json({ message: "Convite recusado com sucesso" });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }   
    }
}
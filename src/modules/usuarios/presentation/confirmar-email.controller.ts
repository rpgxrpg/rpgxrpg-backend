import { Request, Response } from "express";
import { ConfirmarEmailUseCase } from "../application/confirmar-email.usecase";

export class ConfirmarEmailController {
    constructor(private confirmarEmailUseCase: ConfirmarEmailUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { token } = req.query;
            if (typeof token !== 'string') {
                return res.status(400).json({ error: "Token inválido" });
            }
            await this.confirmarEmailUseCase.executar(token);
            return res.status(200).json({ message: "E-mail confirmado com sucesso" });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

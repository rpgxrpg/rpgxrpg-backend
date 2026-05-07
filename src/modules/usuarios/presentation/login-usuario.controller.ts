import { Request, Response } from "express";
import { LoginUsuarioUseCase } from "../application/login-usuario.usecase";

export class LoginUsuarioController {
    constructor(private loginUsuarioUseCase: LoginUsuarioUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { email, senha } = req.body;
            const token = await this.loginUsuarioUseCase.executar(email, senha);
            return res.status(200).json({ token });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
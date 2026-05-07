import { Request, Response } from "express";
import { CriarUsuarioUseCase } from "../application/criar-usuario.usecase";

export class CriarUsuarioController {
    constructor(private criarUsuarioUseCase: CriarUsuarioUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { nome, email, senha } = req.body;
            const token = await this.criarUsuarioUseCase.executar(nome, email, senha);
            return res.status(201).json({ token });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
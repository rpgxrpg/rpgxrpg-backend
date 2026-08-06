import { Request, Response } from "express";
import { CriarCampanhaUseCase } from "../application/criar-campanha.usecase";

export class CriarCampanhaController {
    constructor(private criarCampanhaUseCase: CriarCampanhaUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { titulo, numero, status } = req.body;
            const criado_por = (req as any).userId;
            if (typeof criado_por !== 'number') {
               return res.status(401).json({ message: 'ID de Usuario invalido.' });
            }
            const campanha = await this.criarCampanhaUseCase.executar(numero, titulo, criado_por, status);
            return res.status(201).json(campanha);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
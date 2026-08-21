import { Request, Response } from "express";
import { ListarAlteracoesPendentesUseCase } from "../application/listar-alteracoes-pendentes.usecase";

export class ListarAlteracoesPendentesController {
  constructor(private listarAlteracoesPendentesUseCase: ListarAlteracoesPendentesUseCase) {}

  executar = async (req: Request, res: Response): Promise<void> => {
    try {
      const campanhaId = Number(req.params.campanhaId);
      const userId = (req as any).userId;
      const alteracoes = await this.listarAlteracoesPendentesUseCase.executar(campanhaId, userId);
      res.status(200).json(alteracoes);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };
}
import { Request, Response } from "express";
import { ListarPersonagensPendentesUseCase } from "../application/listar-personagens-pendentes.usecase";

export class ListarPersonagensPendentesController {
  constructor(private listarPersonagensPendentesUseCase: ListarPersonagensPendentesUseCase) {}

  executar = async (req: Request, res: Response): Promise<void> => {
    try {
      const campanhaId = Number(req.params.campanhaId);
      const userId = (req as any).userId;
      const personagens = await this.listarPersonagensPendentesUseCase.executar(campanhaId, userId);
      res.status(200).json(personagens);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };
}
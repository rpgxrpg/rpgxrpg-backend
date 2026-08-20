import { Request, Response } from "express";
import { SolicitarAlteracaoUseCase } from "../application/solicitar-alteracao.usecase";
import { AprovarAlteracaoUseCase } from "../application/aprovar-alteracao.usecase";
import { RejeitarAlteracaoUseCase } from "../application/rejeitar-alteracao.usecase";

export class AlteracaoPendenteController {
  constructor(
    private solicitarAlteracaoUseCase: SolicitarAlteracaoUseCase,
    private aprovarAlteracaoUseCase: AprovarAlteracaoUseCase,
    private rejeitarAlteracaoUseCase: RejeitarAlteracaoUseCase
  ) {}

  solicitar = async (req: Request, res: Response): Promise<void> => {
    try {
      const personagemId = Number(req.params.personagemId);
      const userId = (req as any).userId;
      const alteracao = await this.solicitarAlteracaoUseCase.executar(personagemId, userId, req.body);
      res.status(201).json(alteracao);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };

  aprovar = async (req: Request, res: Response): Promise<void> => {
    try {
      const alteracaoId = Number(req.params.alteracaoId);
      const userId = (req as any).userId;
      await this.aprovarAlteracaoUseCase.executar(alteracaoId, userId);
      res.status(200).json({ message: "Alteracao aprovada com sucesso" });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };

  rejeitar = async (req: Request, res: Response): Promise<void> => {
    try {
      const alteracaoId = Number(req.params.alteracaoId);
      const userId = (req as any).userId;
      await this.rejeitarAlteracaoUseCase.executar(alteracaoId, userId);
      res.status(200).json({ message: "Alteracao rejeitada com sucesso" });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };
}
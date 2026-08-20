import { Router } from "express";
import { PrismaClient } from "../../../generated/prisma/client";
import { criarAuthMiddleware } from "../../../shared/middlewares/auth.middleware";
import { TokenServiceImplementation } from "../../usuarios/infrastructure/token-service.impl";
import { AlteracaoPendenteRepository } from "../infrastructure/alteracao-pendente.repository";
import { PersonagemRepositoryImplementation } from "../infrastructure/personagem-repository.impl";
import { CampanhaRepositoryImplementation } from "../../campanhas/infrastructure/campanha-repository.impl";
import { SolicitarAlteracaoUseCase } from "../application/solicitar-alteracao.usecase";
import { AprovarAlteracaoUseCase } from "../application/aprovar-alteracao.usecase";
import { RejeitarAlteracaoUseCase } from "../application/rejeitar-alteracao.usecase";
import { AlteracaoPendenteController } from "./alteracao-pendente.controller";

const router = Router();
const prisma = new PrismaClient();
const tokenService = new TokenServiceImplementation();
const authMiddleware = criarAuthMiddleware(tokenService);

const alteracaoPendenteRepository = new AlteracaoPendenteRepository(prisma);
const personagemRepository = new PersonagemRepositoryImplementation(prisma);
const campanhaRepository = new CampanhaRepositoryImplementation(prisma);

const controller = new AlteracaoPendenteController(
  new SolicitarAlteracaoUseCase(alteracaoPendenteRepository, personagemRepository),
  new AprovarAlteracaoUseCase(alteracaoPendenteRepository, personagemRepository, campanhaRepository),
  new RejeitarAlteracaoUseCase(alteracaoPendenteRepository, personagemRepository, campanhaRepository)
);

router.post("/personagens/:personagemId/alteracoes", authMiddleware, controller.solicitar);
router.post("/alteracoes/:alteracaoId/aprovar", authMiddleware, controller.aprovar);
router.post("/alteracoes/:alteracaoId/rejeitar", authMiddleware, controller.rejeitar);

export default router;

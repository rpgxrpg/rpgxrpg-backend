import { Router } from "express";
import { PrismaClient } from "../../../generated/prisma/client";
import { criarAuthMiddleware } from "../../../shared/middlewares/auth.middleware";
import { TokenServiceImplementation } from "../../usuarios/infrastructure/token-service.impl";
import { AlteracaoPendenteRepository } from "../infrastructure/alteracao-pendente.repository.impl";
import { PersonagemRepositoryImplementation } from "../infrastructure/personagem-repository.impl";
import { CampanhaRepositoryImplementation } from "../../campanhas/infrastructure/campanha-repository.impl";
import { ValidarMestreDaCampanha } from "../../../shared/application/validar-mestre-da-campanha.usecase";
import { SolicitarAlteracaoUseCase } from "../application/solicitar-alteracao.usecase";
import { AprovarAlteracaoUseCase } from "../application/aprovar-alteracao.usecase";
import { RejeitarAlteracaoUseCase } from "../application/rejeitar-alteracao.usecase";
import { SolicitarAlteracaoController } from "./solicitar-alteracao.controller";
import { AprovarAlteracaoController } from "./aprovar-alteracao.controller";
import { RejeitarAlteracaoController } from "./rejeitar-alteracao.controller";

const router = Router();
const prisma = new PrismaClient();
const tokenService = new TokenServiceImplementation();
const authMiddleware = criarAuthMiddleware(tokenService);

const alteracaoPendenteRepository = new AlteracaoPendenteRepository(prisma);
const personagemRepository = new PersonagemRepositoryImplementation(prisma);
const campanhaRepository = new CampanhaRepositoryImplementation(prisma);
const validarMestreDaCampanha = new ValidarMestreDaCampanha(campanhaRepository);

const solicitarAlteracaoUseCase    = new SolicitarAlteracaoUseCase(alteracaoPendenteRepository, personagemRepository);
const solicitarAlteracaoController = new SolicitarAlteracaoController(solicitarAlteracaoUseCase);

const aprovarAlteracaoUseCase    = new AprovarAlteracaoUseCase(alteracaoPendenteRepository, personagemRepository, validarMestreDaCampanha);
const aprovarAlteracaoController = new AprovarAlteracaoController(aprovarAlteracaoUseCase);

const rejeitarAlteracaoUseCase    = new RejeitarAlteracaoUseCase(alteracaoPendenteRepository, personagemRepository, validarMestreDaCampanha);
const rejeitarAlteracaoController = new RejeitarAlteracaoController(rejeitarAlteracaoUseCase);

router.post("/personagens/:personagemId/alteracoes", authMiddleware, (req, res) => solicitarAlteracaoController.handle(req, res));
router.post("/alteracoes/:alteracaoId/aprovar", authMiddleware, (req, res) => aprovarAlteracaoController.handle(req, res));
router.post("/alteracoes/:alteracaoId/rejeitar", authMiddleware, (req, res) => rejeitarAlteracaoController.handle(req, res));

export default router;

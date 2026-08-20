import { Router } from 'express';
import { PrismaClient } from '../../../generated/prisma/client';
import { PersonagemRepositoryImplementation } from '../infrastructure/personagem-repository.impl';
import { CriarPersonagemUseCase } from '../application/criar-personagem.usecase';
import { CriarPersonagemController } from './criar-personagem.controller';
import { AprovarPersonagemUseCase } from '../application/aprovar-personagem.usecase';
import { AprovarPersonagemController } from './aprovar-personagem.controller';
import { RejeitarPersonagemUseCase } from '../application/rejeitar-personagem.usecase';
import { RejeitarPersonagemController } from './rejeitar-personagem.controller';
import { CriarNpcUseCase } from '../application/criar-npc.usecase';
import { CriarNpcController } from './criar-npc.controller';
import { CampanhaRepositoryImplementation } from '../../campanhas/infrastructure/campanha-repository.impl';
import { criarAuthMiddleware } from '../../../shared/middlewares/auth.middleware';
import { TokenServiceImplementation } from '../../usuarios/infrastructure/token-service.impl';
import { CriarInvocacaoUseCase } from '../application/criar-invocacao.usecase';
import { CriarInvocacaoController } from './criar-invocacao.controller';
import { DistribuirXpUseCase } from '../application/distribuir-xp.usecase';
import { DistribuirXpController } from './distribuir-xp.controller';

const router               = Router();
const prisma               = new PrismaClient();
const personagemRepository = new PersonagemRepositoryImplementation(prisma);
const campanhaRepository   = new CampanhaRepositoryImplementation(prisma);
const tokenService         = new TokenServiceImplementation();
const authMiddleware       = criarAuthMiddleware(tokenService);

const criarPersonagemUseCase    = new CriarPersonagemUseCase(personagemRepository, campanhaRepository);
const criarPersonagemController = new CriarPersonagemController(criarPersonagemUseCase);

const aprovarPersonagemUseCase    = new AprovarPersonagemUseCase(personagemRepository, campanhaRepository);
const aprovarPersonagemController = new AprovarPersonagemController(aprovarPersonagemUseCase);

const rejeitarPersonagemUseCase    = new RejeitarPersonagemUseCase(personagemRepository, campanhaRepository);
const rejeitarPersonagemController = new RejeitarPersonagemController(rejeitarPersonagemUseCase);

const criarNpcUseCase    = new CriarNpcUseCase(personagemRepository, campanhaRepository);
const criarNpcController = new CriarNpcController(criarNpcUseCase);

const criarInvocacaoUseCase    = new CriarInvocacaoUseCase(personagemRepository);
const criarInvocacaoController = new CriarInvocacaoController(criarInvocacaoUseCase);

const distribuirXpUseCase    = new DistribuirXpUseCase(personagemRepository, campanhaRepository);
const distribuirXpController = new DistribuirXpController(distribuirXpUseCase);

router.post("/personagens", authMiddleware, (req, res) => criarPersonagemController.handle(req, res));
router.post("/personagens/:personagemId/aprovar", authMiddleware, (req, res) => aprovarPersonagemController.handle(req, res));
router.post("/personagens/:personagemId/rejeitar", authMiddleware, (req, res) => rejeitarPersonagemController.handle(req, res));
router.post("/campanhas/:campanhaId/npcs", authMiddleware, (req, res) => criarNpcController.handle(req, res));
router.post("/personagens/:personagemId/invocacoes", authMiddleware, (req, res) => criarInvocacaoController.handle(req, res));
router.post("/personagens/:personagemId/xp", authMiddleware, (req, res) => distribuirXpController.handle(req, res));

export default router;
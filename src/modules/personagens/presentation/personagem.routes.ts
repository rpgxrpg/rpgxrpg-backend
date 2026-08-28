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
import { ValidarMestreDaCampanha } from "../../../shared/application/validar-mestre-da-campanha.usecase";
import { criarAuthMiddleware } from '../../../shared/middlewares/auth.middleware';
import { TokenServiceImplementation } from '../../usuarios/infrastructure/token-service.impl';
import { CriarInvocacaoUseCase } from '../application/criar-invocacao.usecase';
import { CriarInvocacaoController } from './criar-invocacao.controller';
import { DistribuirXpUseCase } from '../application/distribuir-xp.usecase';
import { DistribuirXpController } from './distribuir-xp.controller';
import { ListarPersonagensUseCase } from '../application/listar-personagens.usecase';
import { ListarPersonagensController } from './listar-personagens.controller';
import { ListarPersonagensPendentesUseCase } from '../application/listar-personagens-pendentes.usecase';
import { ListarPersonagensPendentesController } from './listar-personagens-pendentes.controller';
import { ListarAlteracoesPendentesUseCase } from '../application/listar-alteracoes-pendentes.usecase';
import { ListarAlteracoesPendentesController } from './listar-alteracoes-pendentes.controller';
import { AlteracaoPendenteRepository } from '../infrastructure/alteracao-pendente.repository.impl';

const router               = Router();
const prisma               = new PrismaClient();
const personagemRepository = new PersonagemRepositoryImplementation(prisma);
const alteracaoPendenteRepository = new AlteracaoPendenteRepository(prisma);
const campanhaRepository   = new CampanhaRepositoryImplementation(prisma);
const validarMestreDaCampanha = new ValidarMestreDaCampanha(campanhaRepository);
const tokenService         = new TokenServiceImplementation();
const authMiddleware       = criarAuthMiddleware(tokenService);

const criarPersonagemUseCase    = new CriarPersonagemUseCase(personagemRepository, campanhaRepository);
const criarPersonagemController = new CriarPersonagemController(criarPersonagemUseCase);

const aprovarPersonagemUseCase    = new AprovarPersonagemUseCase(personagemRepository, validarMestreDaCampanha);
const aprovarPersonagemController = new AprovarPersonagemController(aprovarPersonagemUseCase);

const rejeitarPersonagemUseCase    = new RejeitarPersonagemUseCase(personagemRepository, validarMestreDaCampanha);
const rejeitarPersonagemController = new RejeitarPersonagemController(rejeitarPersonagemUseCase);

const criarNpcUseCase    = new CriarNpcUseCase(personagemRepository, validarMestreDaCampanha);
const criarNpcController = new CriarNpcController(criarNpcUseCase);

const criarInvocacaoUseCase    = new CriarInvocacaoUseCase(personagemRepository);
const criarInvocacaoController = new CriarInvocacaoController(criarInvocacaoUseCase);

const distribuirXpUseCase    = new DistribuirXpUseCase(personagemRepository, validarMestreDaCampanha);
const distribuirXpController = new DistribuirXpController(distribuirXpUseCase);

const listarPersonagensUseCase    = new ListarPersonagensUseCase(personagemRepository, validarMestreDaCampanha);
const listarPersonagensController = new ListarPersonagensController(listarPersonagensUseCase);

const listarPersonagensPendentesUseCase    = new ListarPersonagensPendentesUseCase(personagemRepository, validarMestreDaCampanha);
const listarPersonagensPendentesController = new ListarPersonagensPendentesController(listarPersonagensPendentesUseCase);

const listarAlteracoesPendentesUseCase    = new ListarAlteracoesPendentesUseCase(alteracaoPendenteRepository, validarMestreDaCampanha);
const listarAlteracoesPendentesController = new ListarAlteracoesPendentesController(listarAlteracoesPendentesUseCase);

router.post("/personagens", authMiddleware, (req, res) => criarPersonagemController.handle(req, res));
router.post("/personagens/:personagemId/aprovar", authMiddleware, (req, res) => aprovarPersonagemController.handle(req, res));
router.post("/personagens/:personagemId/rejeitar", authMiddleware, (req, res) => rejeitarPersonagemController.handle(req, res));
router.post("/campanhas/:campanhaId/npcs", authMiddleware, (req, res) => criarNpcController.handle(req, res));
router.post("/personagens/:personagemId/invocacoes", authMiddleware, (req, res) => criarInvocacaoController.handle(req, res));
router.post("/personagens/:personagemId/xp", authMiddleware, (req, res) => distribuirXpController.handle(req, res));
router.get("/campanhas/:campanhaId/personagens", authMiddleware, (req, res) => listarPersonagensController.handle(req, res));
router.get("/campanhas/:campanhaId/personagens/pendentes", authMiddleware, (req, res) => listarPersonagensPendentesController.handle(req, res));
router.get("/campanhas/:campanhaId/alteracoes/pendentes", authMiddleware, (req, res) => listarAlteracoesPendentesController.handle(req, res));

export default router;
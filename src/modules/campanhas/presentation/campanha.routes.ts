import { Router } from 'express';
import { PrismaClient } from '../../../generated/prisma/client';
import { CriarCampanhaUseCase } from '../application/criar-campanha.usecase';
import { CriarCampanhaController } from './criar-campanha.controller';
import { CampanhaRepositoryImplementation } from '../infrastructure/campanha-repository.impl';
import { ConviteRepositoryImplementation } from '../infrastructure/convite-repository.impl';
import { criarAuthMiddleware } from '../../../shared/middlewares/auth.middleware';
import { TokenServiceImplementation } from '../../usuarios/infrastructure/token-service.impl';
import { ConvidarJogadorUseCase } from '../application/convidar-jogador.usecase';
import { ConvidarJogadorController } from './convidar-jogador.controller';
import { UsuarioRepositoryImplementation } from '../../usuarios/infrastructure/usuario-repository.impl';

const router = Router();
const prisma = new PrismaClient();
const campanhaRepository = new CampanhaRepositoryImplementation(prisma);
const conviteRepository = new ConviteRepositoryImplementation(prisma);
const usuarioRepository = new UsuarioRepositoryImplementation(prisma);
const tokenService = new TokenServiceImplementation();
const authMiddleware = criarAuthMiddleware(tokenService);
const criarCampanhaUseCase = new CriarCampanhaUseCase(campanhaRepository);
const criarCampanhaController = new CriarCampanhaController(criarCampanhaUseCase);
const convidarJogadorUseCase = new ConvidarJogadorUseCase(conviteRepository, usuarioRepository, campanhaRepository);
const convidarJogadorController = new ConvidarJogadorController(convidarJogadorUseCase);

router.post("/", authMiddleware, (req, res) => criarCampanhaController.handle(req, res))
router.post("/:campanhaId/convidar", authMiddleware, (req, res) => convidarJogadorController.handle(req, res))

export default router;
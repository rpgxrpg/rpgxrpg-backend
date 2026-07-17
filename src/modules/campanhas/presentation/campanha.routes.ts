import { Router } from 'express';
import { PrismaClient } from '../../../generated/prisma/client';
import { CriarCampanhaUseCase } from '../application/criar-campanha.usecase';
import { CriarCampanhaController } from './criar-campanha.controller';
import { CampanhaRepositoryImplementation } from '../infrastructure/campanha-repository.impl';
import { criarAuthMiddleware } from '../../../shared/middlewares/auth.middleware';
import { TokenServiceImplementation } from '../../usuarios/infrastructure/token-service.impl';

const router = Router();
const prisma = new PrismaClient();
const campanhaRepository = new CampanhaRepositoryImplementation(prisma);
const tokenService = new TokenServiceImplementation();
const authMiddleware = criarAuthMiddleware(tokenService);
const criarCampanhaUseCase = new CriarCampanhaUseCase(campanhaRepository);
const criarCampanhaController = new CriarCampanhaController(criarCampanhaUseCase);

router.post("/", authMiddleware, (req, res) => criarCampanhaController.handle(req, res))

export default router;
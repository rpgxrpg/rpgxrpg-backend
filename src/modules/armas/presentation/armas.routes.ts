import { Router } from 'express';
import { PrismaClient } from '../../../generated/prisma/client';
import { ArmaRepositoryImplementation } from '../infrastructure/arma-repository.impl';
import { CriarArmaUseCase } from '../application/criar-arma.usecase';
import { CriarArmaController } from './criar-arma.controller';
import { ListarArmasUseCase } from '../application/listar-armas.usecase';
import { ListarArmasController } from './listar-armas.controller';
import { CampanhaRepositoryImplementation } from '../../campanhas/infrastructure/campanha-repository.impl';
import { ValidarMestreDaCampanha } from '../../../shared/application/validar-mestre-da-campanha.usecase';
import { criarAuthMiddleware } from '../../../shared/middlewares/auth.middleware';
import { TokenServiceImplementation } from '../../usuarios/infrastructure/token-service.impl';

const router = Router();
const prisma = new PrismaClient();
const armaRepository = new ArmaRepositoryImplementation(prisma);
const campanhaRepository = new CampanhaRepositoryImplementation(prisma);
const validarMestreDaCampanha = new ValidarMestreDaCampanha(campanhaRepository);
const tokenService = new TokenServiceImplementation();
const authMiddleware = criarAuthMiddleware(tokenService);

const criarArmaUseCase = new CriarArmaUseCase(armaRepository, validarMestreDaCampanha);
const criarArmaController = new CriarArmaController(criarArmaUseCase);

const listarArmasUseCase = new ListarArmasUseCase(armaRepository, validarMestreDaCampanha);
const listarArmasController = new ListarArmasController(listarArmasUseCase);

router.post("/campanhas/:campanhaId/armas", authMiddleware, (req, res) => criarArmaController.handle(req, res));
router.get("/campanhas/:campanhaId/armas", authMiddleware, (req, res) => listarArmasController.handle(req, res));

export default router;

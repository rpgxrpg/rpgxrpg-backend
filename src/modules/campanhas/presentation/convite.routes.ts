import { Router } from 'express';
import { PrismaClient } from '../../../generated/prisma/client';
import { CampanhaRepositoryImplementation } from '../infrastructure/campanha-repository.impl';
import { ConviteRepositoryImplementation } from '../infrastructure/convite-repository.impl';
import { criarAuthMiddleware } from '../../../shared/middlewares/auth.middleware';
import { TokenServiceImplementation } from '../../usuarios/infrastructure/token-service.impl';
import { AceitarConviteUseCase } from '../application/aceitar-convite.usecase';
import { AceitarConviteController } from './aceitar-convite.controller';
import { RecusarConviteUseCase } from '../application/recusar-convite.usecase';
import { RecusarConviteController } from './recusar-convite.controller';

const router = Router();
const prisma = new PrismaClient();
const campanhaRepository = new CampanhaRepositoryImplementation(prisma);
const conviteRepository = new ConviteRepositoryImplementation(prisma);
const tokenService = new TokenServiceImplementation();
const authMiddleware = criarAuthMiddleware(tokenService);

const aceitarConviteUseCase = new AceitarConviteUseCase(conviteRepository, campanhaRepository);
const aceitarConviteController = new AceitarConviteController(aceitarConviteUseCase);

const recusarConviteUseCase = new RecusarConviteUseCase(conviteRepository);
const recusarConviteController = new RecusarConviteController(recusarConviteUseCase);

/**
 * @swagger
 * /api/convites/{conviteId}/aceitar:
 *   post:
 *     tags: [Convites]
 *     summary: Aceitar convite de campanha
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conviteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do convite
 *     responses:
 *       200:
 *         description: Convite aceito com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token inválido ou não fornecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.post("/:conviteId/aceitar", authMiddleware, (req, res) => aceitarConviteController.handle(req, res));

/**
 * @swagger
 * /api/convites/{conviteId}/recusar:
 *   post:
 *     tags: [Convites]
 *     summary: Recusar convite de campanha
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conviteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do convite
 *     responses:
 *       200:
 *         description: Convite recusado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token inválido ou não fornecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.post("/:conviteId/recusar", authMiddleware, (req, res) => recusarConviteController.handle(req, res));

export default router;
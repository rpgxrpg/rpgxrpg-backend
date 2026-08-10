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

/**
 * @swagger
 * /api/campanhas:
 *   post:
 *     tags: [Campanhas]
 *     summary: Criar nova campanha
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CriarCampanhaRequest'
 *     responses:
 *       201:
 *         description: Campanha criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campanha'
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
router.post("/", authMiddleware, (req, res) => criarCampanhaController.handle(req, res))

/**
 * @swagger
 * /api/campanhas/{campanhaId}/convidar:
 *   post:
 *     tags: [Campanhas]
 *     summary: Convitar jogador para campanha
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: campanhaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da campanha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConvidarJogadorRequest'
 *     responses:
 *       201:
 *         description: Convite criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Convite'
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
router.post("/:campanhaId/convidar", authMiddleware, (req, res) => convidarJogadorController.handle(req, res))

export default router;
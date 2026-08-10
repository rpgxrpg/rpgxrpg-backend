import { Router } from "express"
import { PrismaClient } from "../../../generated/prisma/client"
import { HashServiceImplementation } from "../infrastructure/hash-service.impl"
import { TokenServiceImplementation } from "../infrastructure/token-service.impl"
import { UsuarioRepositoryImplementation } from "../infrastructure/usuario-repository.impl"
import { CriarUsuarioUseCase } from "../application/criar-usuario.usecase"
import { CriarUsuarioController } from "./criar-usuario.controller"
import { LoginUsuarioUseCase } from "../application/login-usuario.usecase"
import { LoginUsuarioController } from "./login-usuario.controller"
import { EmailServiceImplementation } from "../infrastructure/email-service.impl"
import { ConfirmarEmailUseCase } from "../application/confirmar-email.usecase"
import { ConfirmarEmailController } from "./confirmar-email.controller"

const router = Router()
const prisma = new PrismaClient()
const usuarioRepository = new UsuarioRepositoryImplementation(prisma)
const hashService = new HashServiceImplementation()
const tokenService = new TokenServiceImplementation()
const emailService = new EmailServiceImplementation()
const criarUsuarioUseCase = new CriarUsuarioUseCase(usuarioRepository, hashService, tokenService, emailService)
const criarUsuarioController = new CriarUsuarioController(criarUsuarioUseCase)
const loginUsuarioUseCase = new LoginUsuarioUseCase(usuarioRepository, hashService, tokenService)
const loginUsuarioController = new LoginUsuarioController(loginUsuarioUseCase)
const confirmarEmailUseCase = new ConfirmarEmailUseCase(usuarioRepository, tokenService)
const confirmarEmailController = new ConfirmarEmailController(confirmarEmailUseCase)


/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     tags: [Usuarios]
 *     summary: Criar novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CriarUsuarioRequest'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", (req, res) => criarUsuarioController.handle(req, res))

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     tags: [Usuarios]
 *     summary: Login de usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/login", (req, res) => loginUsuarioController.handle(req, res))

/**
 * @swagger
 * /api/usuarios/confirmar:
 *   get:
 *     tags: [Usuarios]
 *     summary: Confirmar e-mail do usuário
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de confirmação enviado por e-mail
 *     responses:
 *       200:
 *         description: E-mail confirmado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/confirmar", (req, res) => confirmarEmailController.handle(req, res))

export default router
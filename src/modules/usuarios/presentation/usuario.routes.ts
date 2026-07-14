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

router.post("/", (req, res) => criarUsuarioController.handle(req, res))
router.post("/login", (req, res) => loginUsuarioController.handle(req, res))
router.get("/confirmar", (req, res) => confirmarEmailController.handle(req, res))

export default router
import { Router } from "express"
import { PrismaClient } from "../../../generated/prisma/client"
import { HashServiceImplementation } from "../infrastructure/hash-service.impl"
import { TokenServiceImplementation } from "../infrastructure/token-service.impl"
import { UsuarioRepositoryImplementation } from "../infrastructure/usuario-repository.impl"
import { CriarUsuarioUseCase } from "../application/criar-usuario.usecase"
import { CriarUsuarioController } from "./criar-usuario.controller"
import { LoginUsuarioUseCase } from "../application/login-usuario.usecase"
import { LoginUsuarioController } from "./login-usuario.controller"

const router = Router()
const prisma = new PrismaClient()
const usuarioRepository = new UsuarioRepositoryImplementation(prisma)
const hashService = new HashServiceImplementation()
const tokenService = new TokenServiceImplementation()
const criarUsuarioUseCase = new CriarUsuarioUseCase(usuarioRepository, hashService, tokenService)
const criarUsuarioController = new CriarUsuarioController(criarUsuarioUseCase)
const loginUsuarioUseCase = new LoginUsuarioUseCase(usuarioRepository, hashService, tokenService)
const loginUsuarioController = new LoginUsuarioController(loginUsuarioUseCase)

router.post("/", (req, res) => criarUsuarioController.handle(req, res))
router.post("/login", (req, res) => loginUsuarioController.handle(req, res))

export default router
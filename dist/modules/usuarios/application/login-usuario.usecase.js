"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUsuarioUseCase = void 0;
class LoginUsuarioUseCase {
    constructor(usuarioRepository, hashService, tokenService) {
        this.usuarioRepository = usuarioRepository;
        this.hashService = hashService;
        this.tokenService = tokenService;
    }
    async executar(email, senha) {
        const usuario = await this.usuarioRepository.buscarPorEmail(email);
        if (!usuario) {
            throw new Error("Credenciais invalidas");
        }
        const senhaValida = await this.hashService.comparar(senha, usuario.senha);
        if (!senhaValida) {
            throw new Error("Credenciais invalidas");
        }
        const emailVerificado = usuario.verificado;
        if (!emailVerificado) {
            throw new Error("Email nao verificado");
        }
        const token = this.tokenService.gerar({ id: usuario.id });
        return token;
    }
}
exports.LoginUsuarioUseCase = LoginUsuarioUseCase;

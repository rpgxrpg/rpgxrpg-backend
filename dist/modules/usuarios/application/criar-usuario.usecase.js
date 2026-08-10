"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarUsuarioUseCase = void 0;
class CriarUsuarioUseCase {
    constructor(usuarioRepository, hashService, tokenService, emailService) {
        this.usuarioRepository = usuarioRepository;
        this.hashService = hashService;
        this.tokenService = tokenService;
        this.emailService = emailService;
    }
    async executar(nome, email, senha) {
        const usuarioExistente = await this.usuarioRepository.buscarPorEmail(email);
        if (usuarioExistente) {
            throw new Error("Email já cadastrado");
        }
        const hash = await this.hashService.hash(senha);
        const usuario = { nome, email, senha: hash };
        const usuarioSalvo = await this.usuarioRepository.salvar(usuario);
        const usuarioEmail = usuarioSalvo.email;
        const tokenEmail = this.tokenService.gerar({ email: usuarioEmail });
        await this.emailService.enviar(usuarioEmail, "Verificação de Email", `Clique aqui para confirmar: http://localhost:3000/api/usuarios/confirmar?token=${tokenEmail}`);
        return this.tokenService.gerar({ id: usuarioSalvo.id });
    }
}
exports.CriarUsuarioUseCase = CriarUsuarioUseCase;

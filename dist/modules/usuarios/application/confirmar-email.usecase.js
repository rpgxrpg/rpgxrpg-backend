"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmarEmailUseCase = void 0;
class ConfirmarEmailUseCase {
    constructor(usuarioRepository, tokenService) {
        this.usuarioRepository = usuarioRepository;
        this.tokenService = tokenService;
    }
    async executar(token) {
        const payload = this.tokenService.verificar(token);
        const email = payload.email;
        if (!email) {
            throw new Error("Token inválido");
        }
        await this.usuarioRepository.marcarComoVerificado(email);
    }
}
exports.ConfirmarEmailUseCase = ConfirmarEmailUseCase;

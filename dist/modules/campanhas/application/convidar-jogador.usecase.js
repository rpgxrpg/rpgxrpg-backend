"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvidarJogadorUseCase = void 0;
const enums_1 = require("../../../generated/prisma/enums");
class ConvidarJogadorUseCase {
    constructor(conviteRepository, usuarioRepository, campanhaRepository) {
        this.conviteRepository = conviteRepository;
        this.usuarioRepository = usuarioRepository;
        this.campanhaRepository = campanhaRepository;
    }
    async executar(campanhaId, email, quemConvida) {
        const campanha = await this.campanhaRepository.buscarPorId(campanhaId);
        if (!campanha) {
            throw new Error("Campanha nao encontrada");
        }
        if (quemConvida !== campanha?.criado_por) {
            throw new Error("Apenas o mestre pode convidar jogadores");
        }
        const usuario = await this.usuarioRepository.buscarPorEmail(email);
        if (!usuario) {
            throw new Error("Usuario nao encontrado");
        }
        const convite = {
            campanha_id: campanhaId,
            usuario_id: usuario.id,
            status: enums_1.StatusConvite.pendente
        };
        return await this.conviteRepository.criar(convite);
    }
}
exports.ConvidarJogadorUseCase = ConvidarJogadorUseCase;

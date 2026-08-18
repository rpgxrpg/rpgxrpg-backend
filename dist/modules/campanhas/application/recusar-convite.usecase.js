"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecusarConviteUseCase = void 0;
const enums_1 = require("../../../generated/prisma/enums");
class RecusarConviteUseCase {
    constructor(conviteRepository) {
        this.conviteRepository = conviteRepository;
    }
    async executar(conviteId, quemRecusou) {
        const convite = await this.conviteRepository.buscarPorId(conviteId);
        if (!convite) {
            throw new Error("Convite nao encontrado");
        }
        if (quemRecusou !== convite.usuario_id) {
            throw new Error("Apenas o usuario convidado pode recusar o convite");
        }
        if (convite.status !== enums_1.StatusConvite.pendente) {
            throw new Error("Convite ja foi aceito ou recusado");
        }
        await this.conviteRepository.atualizarStatus(conviteId, enums_1.StatusConvite.recusado);
    }
}
exports.RecusarConviteUseCase = RecusarConviteUseCase;

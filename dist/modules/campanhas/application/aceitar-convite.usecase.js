"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AceitarConviteUseCase = void 0;
const enums_1 = require("../../../generated/prisma/enums");
const enums_2 = require("../../../generated/prisma/enums");
class AceitarConviteUseCase {
    constructor(conviteRepository, campanhaRepository) {
        this.conviteRepository = conviteRepository;
        this.campanhaRepository = campanhaRepository;
    }
    async executar(conviteId, quemAceita) {
        const convite = await this.conviteRepository.buscarPorId(conviteId);
        if (!convite) {
            throw new Error("Convite nao encontrado");
        }
        if (quemAceita !== convite.usuario_id) {
            throw new Error("Apenas o usuario convidado pode aceitar o convite");
        }
        if (convite.status !== enums_1.StatusConvite.pendente) {
            throw new Error("Convite ja foi aceito ou recusado");
        }
        await this.conviteRepository.atualizarStatus(conviteId, enums_1.StatusConvite.aceito);
        await this.campanhaRepository.adicionarParticipante(convite.campanha_id, convite.usuario_id, enums_2.TipoUsuario.jogador);
    }
}
exports.AceitarConviteUseCase = AceitarConviteUseCase;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarCampanhaUseCase = void 0;
const enums_1 = require("../../../generated/prisma/enums");
class CriarCampanhaUseCase {
    constructor(campanhaRepository) {
        this.campanhaRepository = campanhaRepository;
    }
    async executar(numero, titulo, criado_por, status) {
        const campanha = { numero, titulo, criado_por, status };
        const campanhaCriada = await this.campanhaRepository.criar(campanha);
        await this.campanhaRepository.adicionarParticipante(campanhaCriada.id, criado_por, enums_1.TipoUsuario.mestre);
        return campanhaCriada;
    }
}
exports.CriarCampanhaUseCase = CriarCampanhaUseCase;

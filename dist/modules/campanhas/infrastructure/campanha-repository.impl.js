"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampanhaRepositoryImplementation = void 0;
class CampanhaRepositoryImplementation {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async adicionarParticipante(campanhaId, usuarioId, papel) {
        await this.prisma.usuarioCampanha.create({
            data: {
                campanha_id: campanhaId,
                usuario_id: usuarioId,
                papel: papel,
            },
        });
    }
    async criar(campanha) {
        const created = await this.prisma.campanha.create({
            data: {
                titulo: campanha.titulo,
                numero: campanha.numero,
                criado_por: campanha.criado_por,
                status: campanha.status,
            },
        });
        return { id: created.id, titulo: created.titulo, numero: created.numero, criado_por: created.criado_por, status: created.status };
    }
    async buscarPorId(campanhaId) {
        const campanha = await this.prisma.campanha.findUnique({ where: { id: campanhaId } });
        if (!campanha) {
            return null;
        }
        return { id: campanha.id, titulo: campanha.titulo, numero: campanha.numero, criado_por: campanha.criado_por, status: campanha.status };
    }
}
exports.CampanhaRepositoryImplementation = CampanhaRepositoryImplementation;

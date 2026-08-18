"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConviteRepositoryImplementation = void 0;
class ConviteRepositoryImplementation {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async criar(convite) {
        const created = await this.prisma.convite.create({
            data: {
                campanha_id: convite.campanha_id,
                usuario_id: convite.usuario_id,
                status: convite.status,
            },
        });
        return { id: created.id, campanha_id: created.campanha_id, usuario_id: created.usuario_id, status: created.status };
    }
    async buscarPorId(conviteId) {
        const convite = await this.prisma.convite.findUnique({ where: { id: conviteId } });
        if (!convite) {
            return null;
        }
        return { id: convite.id, campanha_id: convite.campanha_id, usuario_id: convite.usuario_id, status: convite.status };
    }
    async atualizarStatus(conviteId, status) {
        await this.prisma.convite.update({
            where: { id: conviteId },
            data: { status: status },
        });
    }
}
exports.ConviteRepositoryImplementation = ConviteRepositoryImplementation;

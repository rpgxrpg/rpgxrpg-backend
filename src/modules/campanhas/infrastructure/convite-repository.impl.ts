import { PrismaClient } from "../../../generated/prisma/client"
import { IConviteRepository } from "../domain/convite-repository.interface";
import { ConviteEntity } from "../domain/convite.entity";
import { StatusConvite } from "../../../generated/prisma/enums"

export class ConviteRepositoryImplementation implements IConviteRepository {
    constructor(private prisma: PrismaClient) {}

    async criar(convite: ConviteEntity): Promise<ConviteEntity> {
        const created = await this.prisma.convite.create({
            data: {
                campanha_id: convite.campanha_id,
                usuario_id: convite.usuario_id,
                status: convite.status,
            },
        });

        return { id: created.id, campanha_id: created.campanha_id, usuario_id: created.usuario_id, status: created.status };
    }

    async buscarPorId(conviteId: number): Promise<ConviteEntity | null> {
        const convite = await this.prisma.convite.findUnique({ where: { id: conviteId } });
        if (!convite) {
            return null;
        }
        return { id: convite.id, campanha_id: convite.campanha_id, usuario_id: convite.usuario_id, status: convite.status };
    }

    async atualizarStatus(conviteId: number, status: StatusConvite): Promise<void> {
        await this.prisma.convite.update({
            where: { id: conviteId },
            data: { status: status },
        });
    }

}
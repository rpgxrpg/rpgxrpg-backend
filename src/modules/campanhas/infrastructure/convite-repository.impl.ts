import { PrismaClient } from "../../../generated/prisma/client"
import { IConviteRepository } from "../domain/convite-repository.interface";
import { ConviteEntity } from "../domain/convite.entity";

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

}
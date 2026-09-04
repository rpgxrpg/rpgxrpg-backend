import { IArmaRepository } from "../domain/arma-repository.interface";
import { PrismaClient } from "../../../generated/prisma/client";
import { ArmaEntity } from "../domain/arma.entity";

export class ArmaRepositoryImplementation implements IArmaRepository {
    constructor(private prisma: PrismaClient) {}

    async criar(arma: ArmaEntity): Promise<ArmaEntity> {
        const { id, ...dados } = arma;
        const created = await this.prisma.arma.create({ data: dados });
        return created;
    }

    async listarPorCampanha(campanhaId: number): Promise<ArmaEntity[]> {
        return await this.prisma.arma.findMany({ where: { campanha_id: campanhaId } });
    }
}
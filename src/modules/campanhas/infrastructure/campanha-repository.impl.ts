import { PrismaClient } from "../../../generated/prisma/client"
import { ICampanhaRepository } from "../domain/campanha-repository.interface";
import { CampanhaEntity } from "../domain/campanha.entity";

export class CampanhaRepositoryImplementation implements ICampanhaRepository {
    constructor(private prisma: PrismaClient) {}

    async criar(campanha: CampanhaEntity): Promise<CampanhaEntity> {
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
}
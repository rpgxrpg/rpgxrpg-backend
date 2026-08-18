import { PrismaClient, TipoUsuario } from "../../../generated/prisma/client"
import { ICampanhaRepository } from "../domain/campanha-repository.interface";
import { CampanhaEntity } from "../domain/campanha.entity";

export class CampanhaRepositoryImplementation implements ICampanhaRepository {
    constructor(private prisma: PrismaClient) {}

    async adicionarParticipante(campanhaId: number, usuarioId: number, papel: TipoUsuario): Promise<void> {
        await this.prisma.usuarioCampanha.create({
            data: {
                campanha_id: campanhaId,
                usuario_id: usuarioId,
                papel: papel,
            },
        });
    }

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

    async ehParticipante(campanhaId: number, usuarioId: number): Promise<boolean> {
        const participante = await this.prisma.usuarioCampanha.findUnique({
            where: {
                usuario_id_campanha_id: {
                    usuario_id: usuarioId,
                    campanha_id: campanhaId,
                },
            },
        });
        return participante !== null;
    }

    async buscarPorId(campanhaId: number): Promise<CampanhaEntity | null> {
        const campanha = await this.prisma.campanha.findUnique({ where: { id: campanhaId } });
        if (!campanha) {
            return null;
        }
        return { id: campanha.id, titulo: campanha.titulo, numero: campanha.numero, criado_por: campanha.criado_por, status: campanha.status };
    }
}
import { CamposAtributoPersonagem, IPersonagemRepository } from "../domain/personagem-repository.interface";
import { PrismaClient } from "../../../generated/prisma/client";
import { StatusAprovacao } from "../../../generated/prisma/enums";
import { PersonagemEntity } from "../domain/personagem.entity";

export class PersonagemRepositoryImplementation implements IPersonagemRepository {
    constructor(private prisma: PrismaClient) {}

    async criar(personagem: PersonagemEntity): Promise<PersonagemEntity> {
        const { id, ...dados } = personagem
        const created = await this.prisma.personagem.create({ data: dados })
        return created
    }

    async buscarPorId(id: number): Promise<PersonagemEntity | null> {
        return await this.prisma.personagem.findUnique({ where: { id } })
    }

    async listarPorCampanha(campanhaId: number): Promise<PersonagemEntity[]> {
        return await this.prisma.personagem.findMany({
            where: { campanha_id: campanhaId },
        })
    }

    async listarPendentesPorCampanha(campanhaId: number): Promise<PersonagemEntity[]> {
        return await this.prisma.personagem.findMany({
            where: {
                campanha_id: campanhaId,
                status_aprovacao: StatusAprovacao.pendente,
            },
        })
    }

    async atualizarStatus(id: number, status: StatusAprovacao): Promise<void> {
        await this.prisma.personagem.update({
            where: { id },
            data:  { status_aprovacao: status }
        })
    }

    async atualizarXpLivre(id: number, novoTotal: number): Promise<void> {
        await this.prisma.personagem.update({ where: { id }, data: { xp_livre_total: novoTotal } })
    }
    
    async atualizarXpNen(id: number, novoTotal: number): Promise<void> {
        await this.prisma.personagem.update({ where: { id }, data: { xp_nen_total: novoTotal } })
    }

    async aplicarAlteracao(
        personagemId: number,
        campos: CamposAtributoPersonagem,
        xpLivreGasto: number,
        xpNenGasto: number
      ): Promise<void> {
        await this.prisma.personagem.update({
          where: { id: personagemId },
          data: {
            ...campos,
            xp_livre_gasto: { increment: xpLivreGasto },
            xp_nen_gasto: { increment: xpNenGasto },
          },
        });
      }
}

import { IPersonagemRepository } from "../domain/personagem-repository.interface";
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
}

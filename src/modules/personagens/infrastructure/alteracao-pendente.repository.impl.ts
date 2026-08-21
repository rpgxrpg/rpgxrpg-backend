import { PrismaClient } from "../../../generated/prisma/client";
import { IAlteracaoPendenteRepository } from "../domain/alteracao-pendente-repository.interface";
import { AlteracaoPendenteEntity } from "../domain/alteracao-pendente.entity";

export class AlteracaoPendenteRepository implements IAlteracaoPendenteRepository {
  constructor(private prisma: PrismaClient) {}

  async criar(alteracao: AlteracaoPendenteEntity): Promise<AlteracaoPendenteEntity> {
    return this.prisma.alteracaoPendente.create({ data: alteracao });
  }

  async buscarPorId(id: number): Promise<AlteracaoPendenteEntity | null> {
    return this.prisma.alteracaoPendente.findUnique({ where: { id } });
  }

  async buscarPendentePorPersonagem(personagemId: number): Promise<AlteracaoPendenteEntity | null> {
    return this.prisma.alteracaoPendente.findFirst({ where: { personagem_id: personagemId } });
  }

  async listarPorCampanha(campanhaId: number): Promise<AlteracaoPendenteEntity[]> {
    return this.prisma.alteracaoPendente.findMany({
      where: { personagem: { campanha_id: campanhaId } },
    });
  }

  async deletar(id: number): Promise<void> {
    await this.prisma.alteracaoPendente.delete({ where: { id } });
  }
}
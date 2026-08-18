import { IPersonagemRepository } from "../domain/personagem-repository.interface"
import { ICampanhaRepository } from "../../campanhas/domain/campanha-repository.interface"
import { StatusAprovacao } from "../../../generated/prisma/enums"

export class RejeitarPersonagemUseCase {
    constructor(
        private personagemRepository: IPersonagemRepository,
        private campanhaRepository: ICampanhaRepository
    ) {}

    async executar(personagemId: number, quemRejeita: number): Promise<void> {
        const personagem = await this.personagemRepository.buscarPorId(personagemId)
        if (!personagem) {
            throw new Error("Personagem nao encontrado")
        }

        const campanha = await this.campanhaRepository.buscarPorId(personagem.campanha_id)
        if (!campanha) {
            throw new Error("Campanha nao encontrada")
        }

        if (quemRejeita !== campanha.criado_por) {
            throw new Error("Apenas o mestre pode rejeitar personagens")
        }

        if (personagem.status_aprovacao !== StatusAprovacao.pendente) {
            throw new Error("Personagem ja foi aprovado ou rejeitado")
        }

        await this.personagemRepository.atualizarStatus(personagemId, StatusAprovacao.rejeitada)
    }
}
import { IPersonagemRepository } from "../domain/personagem-repository.interface"
import { ICampanhaRepository } from "../../campanhas/domain/campanha-repository.interface"

export class DistribuirXpUseCase {
    constructor(
        private personagemRepository: IPersonagemRepository,
        private campanhaRepository: ICampanhaRepository
    ) {}

    async executar(personagemId: number, quemDistribui: number, quantidade: number, tipo: 'livre' | 'nen'): Promise<void> {
        const personagem = await this.personagemRepository.buscarPorId(personagemId)
        if (!personagem) throw new Error("Personagem nao encontrado")

        const campanha = await this.campanhaRepository.buscarPorId(personagem.campanha_id)
        if (!campanha) throw new Error("Campanha nao encontrada")

        if (quemDistribui !== campanha.criado_por) throw new Error("Apenas o mestre pode distribuir XP")

        if (tipo === 'livre') {
            await this.personagemRepository.atualizarXpLivre(personagemId, personagem.xp_livre_total + quantidade)
        } else {
            await this.personagemRepository.atualizarXpNen(personagemId, personagem.xp_nen_total + quantidade)
        }
    }
}
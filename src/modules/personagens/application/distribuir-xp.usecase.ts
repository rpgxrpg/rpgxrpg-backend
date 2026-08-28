import { ValidarMestreDaCampanha } from "../../../shared/application/validar-mestre-da-campanha.usecase"
import { IPersonagemRepository } from "../domain/personagem-repository.interface"

export class DistribuirXpUseCase {
    constructor(
        private personagemRepository: IPersonagemRepository,
        private validarMestreDaCampanha: ValidarMestreDaCampanha,
    ) {}

    async executar(personagemId: number, quemDistribui: number, quantidade: number, tipo: 'livre' | 'nen'): Promise<void> {
        const personagem = await this.personagemRepository.buscarPorId(personagemId)
        if (!personagem) throw new Error("Personagem nao encontrado")

        await this.validarMestreDaCampanha.executar(personagem.campanha_id, quemDistribui)

        if (tipo === 'livre') {
            await this.personagemRepository.atualizarXpLivre(personagemId, personagem.xp_livre_total + quantidade)
        } else {
            await this.personagemRepository.atualizarXpNen(personagemId, personagem.xp_nen_total + quantidade)
        }
    }
}

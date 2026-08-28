import { StatusAprovacao } from "../../../generated/prisma/enums"
import { ValidarMestreDaCampanha } from "../../../shared/application/validar-mestre-da-campanha.usecase"
import { IPersonagemRepository } from "../domain/personagem-repository.interface"

export class RejeitarPersonagemUseCase {
    constructor(
        private personagemRepository: IPersonagemRepository,
        private validarMestreDaCampanha: ValidarMestreDaCampanha,
    ) {}

    async executar(personagemId: number, quemRejeita: number): Promise<void> {
        const personagem = await this.personagemRepository.buscarPorId(personagemId)
        if (!personagem) {
            throw new Error("Personagem nao encontrado")
        }

        await this.validarMestreDaCampanha.executar(personagem.campanha_id, quemRejeita)

        if (personagem.status_aprovacao !== StatusAprovacao.pendente) {
            throw new Error("Personagem ja foi aprovado ou rejeitado")
        }

        await this.personagemRepository.atualizarStatus(personagemId, StatusAprovacao.rejeitada)
    }
}

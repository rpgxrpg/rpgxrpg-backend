import { ValidarMestreDaCampanha } from "../../../shared/application/validar-mestre-da-campanha.usecase"
import { IPersonagemRepository } from "../domain/personagem-repository.interface"
import { PersonagemEntity } from "../domain/personagem.entity"

export class ListarPersonagensPendentesUseCase {
    constructor(
        private personagemRepository: IPersonagemRepository,
        private validarMestreDaCampanha: ValidarMestreDaCampanha,
    ) {}

    async executar(campanhaId: number, userId: number): Promise<PersonagemEntity[]> {
        await this.validarMestreDaCampanha.executar(campanhaId, userId)
        return await this.personagemRepository.listarPendentesPorCampanha(campanhaId)
    }
}

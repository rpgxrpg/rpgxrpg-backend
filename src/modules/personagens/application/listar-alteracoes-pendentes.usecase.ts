import { ValidarMestreDaCampanha } from "../../../shared/application/validar-mestre-da-campanha.usecase"
import { IAlteracaoPendenteRepository } from "../domain/alteracao-pendente-repository.interface"
import { AlteracaoPendenteEntity } from "../domain/alteracao-pendente.entity"

export class ListarAlteracoesPendentesUseCase {
    constructor(
        private alteracaoPendenteRepository: IAlteracaoPendenteRepository,
        private validarMestreDaCampanha: ValidarMestreDaCampanha,
    ) {}

    async executar(campanhaId: number, userId: number): Promise<AlteracaoPendenteEntity[]> {
        await this.validarMestreDaCampanha.executar(campanhaId, userId)
        return await this.alteracaoPendenteRepository.listarPorCampanha(campanhaId)
    }
}

import { ValidarMestreDaCampanha } from "../../../shared/application/validar-mestre-da-campanha.usecase";
import { IArmaRepository } from "../domain/arma-repository.interface";
import { ArmaEntity } from "../domain/arma.entity";

export class ListarArmasUseCase {
    constructor(
        private armaRepository: IArmaRepository,
        private validarMestreDaCampanha: ValidarMestreDaCampanha,
    ) {}

    async executar(campanhaId: number, usuarioId: number): Promise<ArmaEntity[]> {
        await this.validarMestreDaCampanha.executar(campanhaId, usuarioId);
        return await this.armaRepository.listarPorCampanha(campanhaId);
    }
}

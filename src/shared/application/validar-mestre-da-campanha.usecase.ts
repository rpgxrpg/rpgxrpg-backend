import { ICampanhaRepository } from "../../modules/campanhas/domain/campanha-repository.interface"

export class ValidarMestreDaCampanha {
    constructor(private campanhaRepository: ICampanhaRepository) {}

    async executar(campanhaId: number, userId: number): Promise<void> {
        const campanha = await this.campanhaRepository.buscarPorId(campanhaId)
        if (!campanha) {
            throw new Error("Campanha nao encontrada")
        }
        if (userId !== campanha.criado_por) {
            throw new Error("Apenas o mestre pode realizar esta acao")
        }
    }
}

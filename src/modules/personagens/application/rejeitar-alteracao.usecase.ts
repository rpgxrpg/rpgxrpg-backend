import { ValidarMestreDaCampanha } from "../../../shared/application/validar-mestre-da-campanha.usecase";
import { IAlteracaoPendenteRepository } from "../domain/alteracao-pendente-repository.interface";
import { IPersonagemRepository } from "../domain/personagem-repository.interface";

export class RejeitarAlteracaoUseCase {
    constructor(
        private alteracaoPendenteRepository: IAlteracaoPendenteRepository,
        private personagemRepository: IPersonagemRepository,
        private validarMestreDaCampanha: ValidarMestreDaCampanha,
    ) {}

    async executar(alteracaoId: number, userId: number): Promise<void> {
        const pendencia = await this.alteracaoPendenteRepository.buscarPorId(alteracaoId);
        if (!pendencia) {
            throw new Error("Alteracao pendente nao encontrada");
        }

        const personagem = await this.personagemRepository.buscarPorId(pendencia.personagem_id);
        if (!personagem) {
            throw new Error("Personagem nao encontrado");
        }

        await this.validarMestreDaCampanha.executar(personagem.campanha_id, userId);

        await this.alteracaoPendenteRepository.deletar(alteracaoId);
    }
}

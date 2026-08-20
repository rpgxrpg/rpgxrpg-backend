import { ICampanhaRepository } from "../../campanhas/domain/campanha-repository.interface";
import { IAlteracaoPendenteRepository } from "../domain/alteracao-pendente-repository.interface";
import { IPersonagemRepository } from "../domain/personagem-repository.interface";

export class RejeitarAlteracaoUseCase {
    constructor(
        private alteracaoPendenteRepository: IAlteracaoPendenteRepository,
        private personagemRepository: IPersonagemRepository,
        private campanhaRepository: ICampanhaRepository,
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

        const campanha = await this.campanhaRepository.buscarPorId(personagem.campanha_id);
        if (!campanha) {
            throw new Error("Campanha nao encontrada");
        }

        if (userId !== campanha.criado_por) {
            throw new Error("Apenas o mestre pode rejeitar alteracoes");
        }

        await this.alteracaoPendenteRepository.deletar(alteracaoId);
    }
}

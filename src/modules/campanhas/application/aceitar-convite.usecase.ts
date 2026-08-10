import { ICampanhaRepository } from "../domain/campanha-repository.interface";
import { IConviteRepository } from "../domain/convite-repository.interface";
import { StatusConvite } from "../../../generated/prisma/enums";
import { TipoUsuario } from "../../../generated/prisma/enums";

export class AceitarConviteUseCase {
    constructor(
        private conviteRepository: IConviteRepository,
        private campanhaRepository: ICampanhaRepository
    ) {}

    async executar(conviteId: number, quemAceita: number): Promise<void> {
        const convite = await this.conviteRepository.buscarPorId(conviteId);
        if (!convite) {
            throw new Error("Convite nao encontrado");
        }
        if (quemAceita !== convite.usuario_id) {
            throw new Error("Apenas o usuario convidado pode aceitar o convite");
        }
        if(convite.status !== StatusConvite.pendente) {
            throw new Error("Convite ja foi aceito ou recusado");
        }
        await this.conviteRepository.atualizarStatus(conviteId, StatusConvite.aceito);
        await this.campanhaRepository.adicionarParticipante(
            convite.campanha_id,
            convite.usuario_id,
            TipoUsuario.jogador
        );
    }
}
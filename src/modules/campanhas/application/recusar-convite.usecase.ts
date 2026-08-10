import { StatusConvite } from "../../../generated/prisma/enums";
import { IConviteRepository } from "../domain/convite-repository.interface";

export class RecusarConviteUseCase {
    constructor(
        private conviteRepository: IConviteRepository
    ) {}

    async executar(conviteId: number, quemRecusou: number): Promise<void> {
        const convite = await this.conviteRepository.buscarPorId(conviteId);
        if (!convite) {
            throw new Error("Convite nao encontrado");
        }
        if (quemRecusou !== convite.usuario_id) {
            throw new Error("Apenas o usuario convidado pode recusar o convite");
        }
        if(convite.status !== StatusConvite.pendente) {
            throw new Error("Convite ja foi aceito ou recusado");
        }
        await this.conviteRepository.atualizarStatus(conviteId, StatusConvite.recusado);
    }
}
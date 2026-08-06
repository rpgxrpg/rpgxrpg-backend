import { IConviteRepository } from "../domain/convite-repository.interface";
import { ConviteEntity } from "../domain/convite.entity";
import { IUsuarioRepository } from "../../usuarios/domain/usuario-repository.interface";
import { ICampanhaRepository } from "../domain/campanha-repository.interface";
import { StatusConvite } from "../../../generated/prisma/enums";

export class ConvidarJogadorUseCase {
    constructor(
        private conviteRepository: IConviteRepository,
        private usuarioRepository: IUsuarioRepository,
        private campanhaRepository: ICampanhaRepository
    ) {}
    
    async executar(campanhaId: number, email: string, quemConvida: number) {
        const campanha = await this.campanhaRepository.buscarPorId(campanhaId);
        if (!campanha) {
            throw new Error("Campanha nao encontrada");
        }
        if (quemConvida !== campanha?.criado_por) {
            throw new Error("Apenas o mestre pode convidar jogadores");
        }
        const usuario = await this.usuarioRepository.buscarPorEmail(email);
        if (!usuario) {
            throw new Error("Usuario nao encontrado");
        }
        const convite: ConviteEntity = {
            campanha_id: campanhaId,
            usuario_id: usuario.id!,
            status: StatusConvite.pendente
        };
        return await this.conviteRepository.criar(convite);
    }
}
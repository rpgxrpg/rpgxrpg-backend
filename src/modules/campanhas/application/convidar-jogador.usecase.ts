import { ValidarMestreDaCampanha } from "../../../shared/application/validar-mestre-da-campanha.usecase";
import { IConviteRepository } from "../domain/convite-repository.interface";
import { ConviteEntity } from "../domain/convite.entity";
import { IUsuarioRepository } from "../../usuarios/domain/usuario-repository.interface";
import { StatusConvite } from "../../../generated/prisma/enums";

export class ConvidarJogadorUseCase {
    constructor(
        private conviteRepository: IConviteRepository,
        private usuarioRepository: IUsuarioRepository,
        private validarMestreDaCampanha: ValidarMestreDaCampanha,
    ) {}
    
    async executar(campanhaId: number, email: string, quemConvida: number) {
        await this.validarMestreDaCampanha.executar(campanhaId, quemConvida);

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

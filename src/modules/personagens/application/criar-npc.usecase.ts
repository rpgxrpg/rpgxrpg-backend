import { IPersonagemRepository } from "../domain/personagem-repository.interface"
import { ValidarMestreDaCampanha } from "../../../shared/application/validar-mestre-da-campanha.usecase"
import { PersonagemEntity } from "../domain/personagem.entity"
import { StatusAprovacao, TipoFicha } from "../../../generated/prisma/enums"

export class CriarNpcUseCase {
    constructor(
        private personagemRepository: IPersonagemRepository,
        private validarMestreDaCampanha: ValidarMestreDaCampanha,
    ) {}

    async executar(
        campanhaId: number, 
        dados: Omit<PersonagemEntity, 'id' | 'usuario_id' | 'status_aprovacao' | 'campanha_id' | 'tipo_ficha'>, quemCria: number): Promise<PersonagemEntity> {
            await this.validarMestreDaCampanha.executar(campanhaId, quemCria)

            const npc: PersonagemEntity = {
                ...dados,
                usuario_id: quemCria,
                status_aprovacao: StatusAprovacao.aprovada,
                campanha_id: campanhaId,
                tipo_ficha: TipoFicha.npc
            }
            return await this.personagemRepository.criar(npc)
        }
}

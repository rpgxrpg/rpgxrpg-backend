import { IPersonagemRepository } from "../domain/personagem-repository.interface"
import { ICampanhaRepository } from "../../campanhas/domain/campanha-repository.interface"
import { PersonagemEntity } from "../domain/personagem.entity"
import { StatusAprovacao, TipoFicha } from "../../../generated/prisma/enums"

export class CriarNpcUseCase {
    constructor(
        private personagemRepository: IPersonagemRepository,
        private campanhaRepository: ICampanhaRepository
    ) {}

    async executar(
        campanhaId: number, 
        dados: Omit<PersonagemEntity, 'id' | 'usuario_id' | 'status_aprovacao' | 'campanha_id' | 'tipo_ficha'>, quemCria: number): Promise<PersonagemEntity> {
            const campanha = await this.campanhaRepository.buscarPorId(campanhaId)
            if(!campanha){
                throw new Error("Campanha nao encontrada")
            }
            const ehMestre = campanha.criado_por === quemCria
            if(!ehMestre){
                throw new Error("Apenas mestres podem criar NPCs")
            }

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
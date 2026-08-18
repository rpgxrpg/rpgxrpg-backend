import { IPersonagemRepository } from "../domain/personagem-repository.interface"
import { PersonagemEntity } from "../domain/personagem.entity"
import { StatusAprovacao, TipoFicha } from "../../../generated/prisma/enums"
import { ICampanhaRepository } from "../../campanhas/domain/campanha-repository.interface"

export class CriarPersonagemUseCase {
    constructor(
        private personagemRepository: IPersonagemRepository,
        private campanhaRepository: ICampanhaRepository
    ) {}

    async executar (
        dados: Omit<PersonagemEntity, 'id' | 'usuario_id' | 'status_aprovacao' | 'tipo_ficha'>,
        usuarioId: number
    ): Promise<PersonagemEntity>{
        const campanha = await this.campanhaRepository.buscarPorId(dados.campanha_id)
        if (!campanha) {
            throw new Error("Campanha nao encontrada")
        }
    
        const ehMestre = campanha.criado_por === usuarioId
        const ehParticipante = await this.campanhaRepository.ehParticipante(dados.campanha_id, usuarioId)
        if (!ehMestre && !ehParticipante) {
            throw new Error("Usuario nao pertence a essa campanha")
        }
    
        const personagem: PersonagemEntity = {
            ...dados,
            usuario_id: usuarioId,
            status_aprovacao: StatusAprovacao.pendente,
            tipo_ficha: TipoFicha.personagem
        }
        return await this.personagemRepository.criar(personagem)
    }
}
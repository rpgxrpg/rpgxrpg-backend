import { IPersonagemRepository } from "../domain/personagem-repository.interface"
import { PersonagemEntity } from "../domain/personagem.entity"
import { StatusAprovacao, StatusCampanha, TipoUsuario } from "../../../generated/prisma/enums"

export class CriarPersonagemUseCase {
    constructor(private personagemRepository: IPersonagemRepository) {}

    async executar (
        dados: Omit<PersonagemEntity, 'id' | 'usuario_id' | 'status_aprovacao'>,
        usuarioId: number
    ): Promise<PersonagemEntity>{
        const personagem: PersonagemEntity = {
            ...dados,
            usuario_id: usuarioId,
            status_aprovacao: StatusAprovacao.pendente
        }
        const personagemCriado = await this.personagemRepository.criar(personagem)
        return personagemCriado
    }
}
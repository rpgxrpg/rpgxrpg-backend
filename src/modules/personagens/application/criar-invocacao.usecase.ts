import { StatusAprovacao, TipoFicha } from "../../../generated/prisma/enums";
import { IPersonagemRepository } from "../domain/personagem-repository.interface";
import { PersonagemEntity } from "../domain/personagem.entity";

export class CriarInvocacaoUseCase {
    constructor(private personagemRepository: IPersonagemRepository) {}

    async executar(
        personagemPaiId: number,
        dados: Omit<PersonagemEntity, 'id' | 'usuario_id' | 'status_aprovacao' | 'campanha_id' | 'tipo_ficha' | 'personagem_pai_id'>,
        quemCria: number
    ): Promise<PersonagemEntity> {
        const personagemPai = await this.personagemRepository.buscarPorId(personagemPaiId)
        if (!personagemPai) {
            throw new Error("Personagem pai nao encontrado")
        }

        if (personagemPai.usuario_id !== quemCria) {
            throw new Error("Apenas o dono do personagem pai pode criar invocacoes")
        }

        const invocacao: PersonagemEntity = {
            ...dados,
            usuario_id: quemCria,
            campanha_id: personagemPai.campanha_id,
            tipo_ficha: TipoFicha.invocacao,
            status_aprovacao: StatusAprovacao.pendente,
            personagem_pai_id: personagemPaiId
        }
        return await this.personagemRepository.criar(invocacao)
    }
}
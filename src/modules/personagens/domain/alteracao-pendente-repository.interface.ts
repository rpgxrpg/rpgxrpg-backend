import { AlteracaoPendenteEntity } from "./alteracao-pendente.entity"

export interface IAlteracaoPendenteRepository {
  criar(alteracao: AlteracaoPendenteEntity): Promise<AlteracaoPendenteEntity>
  buscarPorId(id: number): Promise<AlteracaoPendenteEntity | null>
  buscarPendentePorPersonagem(personagemId: number): Promise<AlteracaoPendenteEntity | null>
  deletar(id: number): Promise<void>
}

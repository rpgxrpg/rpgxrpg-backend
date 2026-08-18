import { TipoUsuario } from "../../../generated/prisma/enums"
import { CampanhaEntity } from "./campanha.entity"

export interface ICampanhaRepository {
    criar(campanha: CampanhaEntity): Promise<CampanhaEntity>
    adicionarParticipante(campanhaId: number, usuarioId: number, papel: TipoUsuario): Promise<void>
    buscarPorId(campanhaId: number): Promise<CampanhaEntity | null>
    ehParticipante(campanhaId: number, usuarioId: number): Promise<boolean>
}
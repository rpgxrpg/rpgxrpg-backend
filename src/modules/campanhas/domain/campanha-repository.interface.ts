import { TipoUsuario } from "../../../generated/prisma/enums"
import { CampanhaEntity } from "./campanha.entity"

export interface ICampanhaRepository {
    criar(campanha: CampanhaEntity): Promise<CampanhaEntity>
    adicionarParticipante(campanhaId: number, usuarioId: number, papel: TipoUsuario): Promise<void>
}
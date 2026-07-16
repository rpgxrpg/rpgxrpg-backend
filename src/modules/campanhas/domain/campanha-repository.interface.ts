import { CampanhaEntity } from "./campanha.entity"

export interface ICampanhaRepository {
    criar(campanha: CampanhaEntity): Promise<CampanhaEntity>
}
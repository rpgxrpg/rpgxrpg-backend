import { CampanhaEntity } from "../domain/campanha.entity"
import { ICampanhaRepository } from "../domain/campanha-repository.interface"
import { StatusCampanha } from "../../../generated/prisma/enums"
import { TipoUsuario } from "../../../generated/prisma/enums"

export class CriarCampanhaUseCase {
    constructor(
        private campanhaRepository: ICampanhaRepository
    ) {}

    async executar(numero: number, titulo: string, criado_por: number, status: StatusCampanha): Promise<CampanhaEntity> {
        const campanha: CampanhaEntity = { numero, titulo, criado_por, status }
        const campanhaCriada = await this.campanhaRepository.criar(campanha)
        await this.campanhaRepository.adicionarParticipante(campanhaCriada.id!, criado_por, TipoUsuario.mestre)
        return campanhaCriada
    }
}
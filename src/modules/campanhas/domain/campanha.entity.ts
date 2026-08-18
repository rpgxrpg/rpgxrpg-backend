import { StatusCampanha } from "../../../generated/prisma/enums"

export type CampanhaEntity = {
    id?: number
    numero: number
    titulo: string
    criado_por: number
    status: StatusCampanha
}
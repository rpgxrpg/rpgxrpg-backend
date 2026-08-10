import { StatusConvite } from "../../../generated/prisma/enums"

export type ConviteEntity = {
    id?: number
    campanha_id: number
    usuario_id: number
    status: StatusConvite
}

import { StatusConvite } from "../../../generated/prisma/enums"
import { ConviteEntity } from "./convite.entity"

export interface IConviteRepository {
    criar(convite: ConviteEntity): Promise<ConviteEntity>
    buscarPorId(conviteId: number): Promise<ConviteEntity | null>
    atualizarStatus(conviteId: number, status: StatusConvite): Promise<void>
}
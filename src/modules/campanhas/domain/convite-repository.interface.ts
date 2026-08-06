import { ConviteEntity } from "./convite.entity"

export interface IConviteRepository {
    criar(convite: ConviteEntity): Promise<ConviteEntity>
}
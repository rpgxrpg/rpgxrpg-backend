import { ArmaEntity } from "./arma.entity";

export interface IArmaRepository {
  criar(arma: ArmaEntity): Promise<ArmaEntity>;
}

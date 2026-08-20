import { StatusAprovacao } from "../../../generated/prisma/enums";
import { PersonagemEntity } from "./personagem.entity";

export interface IPersonagemRepository {
  criar(personagem: PersonagemEntity): Promise<PersonagemEntity>;
  buscarPorId(id: number): Promise<PersonagemEntity | null>
  atualizarStatus(id: number, status: StatusAprovacao): Promise<void>
  atualizarXpLivre(id: number, novoTotal: number): Promise<void>
  atualizarXpNen(id: number, novoTotal: number): Promise<void>
}
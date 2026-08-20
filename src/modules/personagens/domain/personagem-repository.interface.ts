import { StatusAprovacao } from "../../../generated/prisma/enums";
import { PersonagemEntity } from "./personagem.entity";

export type CamposAtributoPersonagem = Partial<
  Pick<
    PersonagemEntity,
    | "forca"
    | "destreza"
    | "vigor"
    | "carisma"
    | "manipulacao"
    | "autocontrole"
    | "inteligencia"
    | "raciocinio"
    | "determinacao"
    | "potencia_aura"
    | "dominio_nen"
  >
>

export interface IPersonagemRepository {
  criar(personagem: PersonagemEntity): Promise<PersonagemEntity>;
  buscarPorId(id: number): Promise<PersonagemEntity | null>
  atualizarStatus(id: number, status: StatusAprovacao): Promise<void>
  atualizarXpLivre(id: number, novoTotal: number): Promise<void>
  atualizarXpNen(id: number, novoTotal: number): Promise<void>
  aplicarAlteracao(
    id: number,
    campos: CamposAtributoPersonagem,
    xpLivreGasto: number,
    xpNenGasto: number,
  ): Promise<void>
}
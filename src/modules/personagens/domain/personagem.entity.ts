import { NivelHunter, StatusAprovacao, TipoAura, TipoFicha } from "../../../generated/prisma/enums";

export type PersonagemEntity = {
  id?: number;
  campanha_id: number;
  nome: string;
  usuario_id?: number | null;
  status_aprovacao: StatusAprovacao;
  tipo_ficha: TipoFicha;
  nivel_hunter: NivelHunter;
  afinidade_aura: TipoAura;
  potencia_aura: number;
  dominio_nen: number;
  recuperacao_aura: number;
  recuperacao_zetsu: number;
  forca: number;
  destreza: number;
  vigor: number;
  carisma: number;
  manipulacao: number;
  autocontrole: number;
  inteligencia: number;
  raciocinio: number;
  determinacao: number;
  personagem_pai_id?: number | null;
  xp_livre_total: number;
  xp_livre_gasto: number;
  xp_nen_total: number;
  xp_nen_gasto: number;
}
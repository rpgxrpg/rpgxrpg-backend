import { AlcanceArma, FamiliaArma } from "../../../generated/prisma/enums";

export type ArmaEntity = {
  id?: number;
  nome: string;
  familia: FamiliaArma;
  campanha_id?: number | null;
  custo: number;
  pa: number;
  dano: string;
  precisao_min?: AlcanceArma | null;
  precisao_max?: AlcanceArma | null;
  maximo_min?: AlcanceArma | null;
  maximo_max?: AlcanceArma | null;
};

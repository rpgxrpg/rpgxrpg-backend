export type AlteracaoPendenteEntity = {
  id?: number
  personagem_id: number
  forca?: number | null
  destreza?: number | null
  vigor?: number | null
  carisma?: number | null
  manipulacao?: number | null
  autocontrole?: number | null
  inteligencia?: number | null
  raciocinio?: number | null
  determinacao?: number | null
  potencia_aura?: number | null
  dominio_nen?: number | null
  xp_livre_gasto: number
  xp_nen_gasto: number
  criado_em?: Date
}

import { IAlteracaoPendenteRepository } from "../domain/alteracao-pendente-repository.interface"
import { AlteracaoPendenteEntity } from "../domain/alteracao-pendente.entity"
import { IPersonagemRepository } from "../domain/personagem-repository.interface"
import { PersonagemEntity } from "../domain/personagem.entity"

type CamposAlteracao = Omit<
    AlteracaoPendenteEntity,
    "id" | "personagem_id" | "criado_em" | "xp_livre_gasto" | "xp_nen_gasto"
>

const ATRIBUTOS_LIVRES = [
    "forca",
    "destreza",
    "vigor",
    "carisma",
    "manipulacao",
    "autocontrole",
    "inteligencia",
    "raciocinio",
    "determinacao",
] as const

/**
 * Custo de Potência de Aura para subir ATÉ o `nivel` informado (1 nível por vez).
 * Faixas do livro:
 *   1–3  → 4 XP/nível
 *   4–6  → 6 XP/nível
 *   7–9  → 8 XP/nível
 *  10–13 → 10 XP/nível
 * Ex.: subir de 3 → 4 custa 6 (faixa do nível novo).
 */
function custoPotenciaAura(nivel: number): number {
    if (nivel >= 1 && nivel <= 3) return 4
    if (nivel >= 4 && nivel <= 6) return 6
    if (nivel >= 7 && nivel <= 9) return 8
    if (nivel >= 10 && nivel <= 13) return 10
    throw new Error(`Nivel de potencia_aura invalido: ${nivel}`)
}

/**
 * Custo de Domínio de Nen para subir ATÉ o `nivel` informado (1 nível por vez).
 *
 * TODO: confirmar com Marcos — Domínio de Nen por faixa (1-4:3, 5-7:4, 8-10:5),
 * pode virar fixo 3/ponto. Fonte placeholder: revisão editorial caps. 19-20.
 * Guias de Adaptação/Gameplay dizem 3 XP fixo por ponto, sem faixa.
 *
 * Placeholder atual (revisão editorial):
 *   1–4  → 3 XP/nível
 *   5–7  → 4 XP/nível
 *   8–10 → 5 XP/nível
 * Ex.: subir de 4 → 5 custa 4 (faixa do nível novo).
 */
function custoDominioNen(nivel: number): number {
    if (nivel >= 1 && nivel <= 4) return 3
    if (nivel >= 5 && nivel <= 7) return 4
    if (nivel >= 8 && nivel <= 10) return 5
    throw new Error(`Nivel de dominio_nen invalido: ${nivel}`)
}

export class SolicitarAlteracaoUseCase {
    constructor(
        private alteracaoPendenteRepository: IAlteracaoPendenteRepository,
        private personagemRepository: IPersonagemRepository
    ) {}

    async executar(
        personagemId: number,
        userId: number,
        campos: CamposAlteracao
    ): Promise<AlteracaoPendenteEntity> {
        const personagem = await this.personagemRepository.buscarPorId(personagemId)
        if (!personagem) {
            throw new Error("Personagem nao encontrado")
        }

        if (personagem.usuario_id !== userId) {
            if (!personagem.personagem_pai_id) {
                throw new Error("Apenas o dono do personagem pode solicitar alteracoes")
            }
            const personagemPai = await this.personagemRepository.buscarPorId(personagem.personagem_pai_id)
            if (!personagemPai || personagemPai.usuario_id !== userId) {
                throw new Error("Apenas o dono do personagem pode solicitar alteracoes")
            }
        }

        const pendenciaAberta = await this.alteracaoPendenteRepository.buscarPendentePorPersonagem(personagemId)
        if (pendenciaAberta != null) {
            throw new Error("Ja existe uma alteracao pendente para este personagem")
        }

        const { xp_livre_gasto, xp_nen_gasto } = this.calcularCusto(personagem, campos)

        const saldoLivre = personagem.xp_livre_total - personagem.xp_livre_gasto
        const saldoNen = personagem.xp_nen_total - personagem.xp_nen_gasto
        if (xp_livre_gasto > saldoLivre) {
            throw new Error("XP livre insuficiente")
        }
        if (xp_nen_gasto > saldoNen) {
            throw new Error("XP nen insuficiente")
        }

        return await this.alteracaoPendenteRepository.criar({
            ...campos,
            personagem_id: personagemId,
            xp_livre_gasto,
            xp_nen_gasto,
        })
    }

    /**
     * Calcula o XP a debitar nos dois pools a partir dos campos solicitados.
     *
     * Premissas:
     * - Cada campo sobe no máximo 1 nível por solicitação (`exigirSubidaDeUmNivel`).
     * - O custo usa sempre o nível NOVO (destino), nunca o atual.
     * - Campos omitidos / null não entram no cálculo.
     *
     * XP livre — atributos (força, destreza, vigor, carisma, manipulação,
     * autocontrole, inteligência, raciocínio, determinação):
     *   custo = nível_novo × 5
     *   Ex.: força 2 → 3 custa 3 × 5 = 15 XP livre.
     *
     * XP nen — potência de aura e domínio de nen:
     *   custo = lookup por faixa do nível novo (ver `custoPotenciaAura` /
     *   `custoDominioNen`). Ex.: potência 3 → 4 custa 6 XP nen.
     *
     * Os custos de vários campos na mesma solicitação são somados no pool
     * correspondente antes de conferir o saldo.
     */
    private calcularCusto(
        personagem: PersonagemEntity,
        campos: CamposAlteracao
    ): { xp_livre_gasto: number; xp_nen_gasto: number } {
        let xp_livre_gasto = 0
        let xp_nen_gasto = 0

        for (const atributo of ATRIBUTOS_LIVRES) {
            const novo = this.exigirSubidaDeUmNivel(atributo, personagem[atributo], campos[atributo])
            if (novo == null) continue
            // Atributo: custo = nível novo × 5 (livro)
            xp_livre_gasto += novo * 5
        }

        {
            const novo = this.exigirSubidaDeUmNivel("potencia_aura", personagem.potencia_aura, campos.potencia_aura)
            if (novo != null) xp_nen_gasto += custoPotenciaAura(novo)
        }

        {
            const novo = this.exigirSubidaDeUmNivel("dominio_nen", personagem.dominio_nen, campos.dominio_nen)
            if (novo != null) xp_nen_gasto += custoDominioNen(novo)
        }

        return { xp_livre_gasto, xp_nen_gasto }
    }

    /**
     * Garante que o valor enviado, se presente, seja exatamente atual + 1.
     * Retorna null quando o campo não foi solicitado.
     * Impede redução e salto de nível (ex.: 2 → 4), resolvendo a ambiguidade
     * do livro sobre somar cada degrau vs. cobrar só o nível final.
     */
    private exigirSubidaDeUmNivel(
        campo: string,
        atual: number,
        novo: number | null | undefined
    ): number | null {
        if (novo == null) return null
        if (novo !== atual + 1) {
            throw new Error(`So e permitido subir 1 nivel por vez em ${campo} (atual: ${atual}, enviado: ${novo})`)
        }
        return novo
    }
}

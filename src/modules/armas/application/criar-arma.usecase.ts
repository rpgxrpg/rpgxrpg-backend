import { AlcanceArma, FamiliaArma } from "../../../generated/prisma/enums";
import { ValidarMestreDaCampanha } from "../../../shared/application/validar-mestre-da-campanha.usecase";
import { ArmaEntity } from "../domain/arma.entity";
import { IArmaRepository } from "../domain/arma-repository.interface";

const FAMILIAS_DISTANCIA: ReadonlySet<FamiliaArma> = new Set([
    FamiliaArma.pistolas,
    FamiliaArma.escopetas,
    FamiliaArma.submetralhadoras,
    FamiliaArma.fuzis_assalto,
    FamiliaArma.fuzis_precisao,
    FamiliaArma.metralhadoras_pesadas,
    FamiliaArma.lanca_chamas,
    FamiliaArma.lanca_granadas,
    FamiliaArma.lanca_foguetes,
    FamiliaArma.outros_propulsao,
]);

function campoPreenchido(valor: AlcanceArma | null | undefined): boolean {
    return valor != null;
}

function parMinMaxInvalido(
    min: AlcanceArma | null | undefined,
    max: AlcanceArma | null | undefined,
): boolean {
    return campoPreenchido(min) !== campoPreenchido(max);
}

export class CriarArmaUseCase {
    constructor(
        private armaRepository: IArmaRepository,
        private validarMestreDaCampanha: ValidarMestreDaCampanha,
    ) {}

    async executar(dados: Omit<ArmaEntity, "id">, usuarioId: number): Promise<ArmaEntity> {
        if (dados.campanha_id == null) {
            throw new Error("Campanha nao encontrada");
        }

        await this.validarMestreDaCampanha.executar(dados.campanha_id, usuarioId);

        const alcances = [
            dados.precisao_min,
            dados.precisao_max,
            dados.maximo_min,
            dados.maximo_max,
        ];
        const todosPreenchidos = alcances.every(campoPreenchido);
        const todosNulos = alcances.every((campo) => !campoPreenchido(campo));

        if (FAMILIAS_DISTANCIA.has(dados.familia) && !todosPreenchidos) {
            throw new Error("Armas a distancia exigem os 4 campos de alcance");
        }

        if (!FAMILIAS_DISTANCIA.has(dados.familia) && !todosNulos) {
            throw new Error("Armas corpo a corpo sem Propulsao nao podem ter campos de alcance");
        }

        if (
            parMinMaxInvalido(dados.precisao_min, dados.precisao_max) ||
            parMinMaxInvalido(dados.maximo_min, dados.maximo_max)
        ) {
            throw new Error("Cada par de alcance min/max deve ser preenchido em conjunto");
        }

        return this.armaRepository.criar(dados);
    }
}

import { ValidarMestreDaCampanha } from "../../../shared/application/validar-mestre-da-campanha.usecase";
import { IAlteracaoPendenteRepository } from "../domain/alteracao-pendente-repository.interface";
import { AlteracaoPendenteEntity } from "../domain/alteracao-pendente.entity";
import { CamposAtributoPersonagem, IPersonagemRepository } from "../domain/personagem-repository.interface";

const CAMPOS_ATRIBUTO = [
    "forca",
    "destreza",
    "vigor",
    "carisma",
    "manipulacao",
    "autocontrole",
    "inteligencia",
    "raciocinio",
    "determinacao",
    "potencia_aura",
    "dominio_nen",
] as const satisfies ReadonlyArray<keyof CamposAtributoPersonagem>;

export class AprovarAlteracaoUseCase {
    constructor(
        private alteracaoPendenteRepository: IAlteracaoPendenteRepository,
        private personagemRepository: IPersonagemRepository,
        private validarMestreDaCampanha: ValidarMestreDaCampanha,
    ) {}

    async executar(alteracaoId: number, userId: number): Promise<void> {
        const pendencia = await this.alteracaoPendenteRepository.buscarPorId(alteracaoId);
        if (!pendencia) {
            throw new Error("Alteracao pendente nao encontrada");
        }

        const personagem = await this.personagemRepository.buscarPorId(pendencia.personagem_id);
        if (!personagem) {
            throw new Error("Personagem nao encontrado");
        }

        await this.validarMestreDaCampanha.executar(personagem.campanha_id, userId);

        const campos = extrairCamposAtributo(pendencia);
        await this.personagemRepository.aplicarAlteracao(
            pendencia.personagem_id,
            campos,
            pendencia.xp_livre_gasto,
            pendencia.xp_nen_gasto,
        );

        await this.alteracaoPendenteRepository.deletar(alteracaoId);
    }
}

function extrairCamposAtributo(pendencia: AlteracaoPendenteEntity): CamposAtributoPersonagem {
    const campos: CamposAtributoPersonagem = {};
    for (const campo of CAMPOS_ATRIBUTO) {
        const valor = pendencia[campo];
        if (valor != null) {
            campos[campo] = valor;
        }
    }
    return campos;
}

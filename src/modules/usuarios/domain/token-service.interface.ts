export interface ITokenService {
    gerar(payload: object): string
    verificar(token: string): object
}
export interface IHashService {
    hash(senha: string): Promise<string>
    comparar(senha: string, hash: string): Promise<boolean>
}
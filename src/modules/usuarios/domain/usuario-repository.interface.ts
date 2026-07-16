import { UsuarioEntity } from "./usuario.entity"

export interface IUsuarioRepository {
    buscarPorEmail(email: string): Promise<UsuarioEntity|null>
    salvar(usuario: UsuarioEntity): Promise<UsuarioEntity>
    marcarComoVerificado(email: string): Promise<void>
}
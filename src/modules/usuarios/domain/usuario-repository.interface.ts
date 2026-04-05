import { UsuarioEntity } from "./usuario.entity"

export interface IUsuarioRepository {
    buscarPorEmail(email: string): Promise<UsuarioEntity|null>
    salvar(usuario: UsuarioEntity): Promise<void>
}
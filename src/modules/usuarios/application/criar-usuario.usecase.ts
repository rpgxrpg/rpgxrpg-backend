import { IHashService } from "../domain/hash-service.interface"
import { ITokenService } from "../domain/token-service.interface"
import { IUsuarioRepository } from "../domain/usuario-repository.interface"
import { UsuarioEntity } from "../domain/usuario.entity"

export class CriarUsuarioUseCase {
    constructor(
        private usuarioRepository: IUsuarioRepository,
        private hashService: IHashService,
        private tokenService: ITokenService
    ) {}

    async executar(nome: string, email: string, senha: string): Promise<string> {
        const usuarioExistente = await this.usuarioRepository.buscarPorEmail(email)
        if (usuarioExistente) {
            throw new Error("Email já cadastrado")
        }
        
        const hash = await this.hashService.hash(senha)
        const usuario: UsuarioEntity = { nome, email, senha: hash }

        const usuarioSalvo = await this.usuarioRepository.salvar(usuario)

        return this.tokenService.gerar({ id: usuarioSalvo.id })
    }
}
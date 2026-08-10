import { IEmailService } from "../domain/email-service.interface"
import { IHashService } from "../domain/hash-service.interface"
import { ITokenService } from "../domain/token-service.interface"
import { IUsuarioRepository } from "../domain/usuario-repository.interface"
import { UsuarioEntity } from "../domain/usuario.entity"

export class CriarUsuarioUseCase {
    constructor(
        private usuarioRepository: IUsuarioRepository,
        private hashService: IHashService,
        private tokenService: ITokenService,
        private emailService: IEmailService,
    ) {}

    async executar(nome: string, email: string, senha: string): Promise<string> {
        const usuarioExistente = await this.usuarioRepository.buscarPorEmail(email)
        if (usuarioExistente) {
            throw new Error("Email já cadastrado")
        }
        
        const hash = await this.hashService.hash(senha)
        const usuario: UsuarioEntity = { nome, email, senha: hash }

        const usuarioSalvo = await this.usuarioRepository.salvar(usuario)
        
        const usuarioEmail = usuarioSalvo.email
        const tokenEmail = this.tokenService.gerar({ email: usuarioEmail })

        await this.emailService.enviar(usuarioEmail, "Verificação de Email", `Clique aqui para confirmar: http://localhost:3000/api/usuarios/confirmar?token=${tokenEmail}`)

        return this.tokenService.gerar({ id: usuarioSalvo.id })
    }
}
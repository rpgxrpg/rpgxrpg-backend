import { IUsuarioRepository } from "../domain/usuario-repository.interface"
import { ITokenService } from "../domain/token-service.interface"

export class ConfirmarEmailUseCase {
    constructor(
        private usuarioRepository: IUsuarioRepository,
        private tokenService: ITokenService
    ) {}

    async executar(token: string): Promise<void> {
        const payload = this.tokenService.verificar(token)
        const email = (payload as { email: string }).email

        if (!email) {
            throw new Error("Token inválido")
        }

        await this.usuarioRepository.marcarComoVerificado(email)
    }
}
import { IUsuarioRepository } from "../domain/usuario-repository.interface"
import { IHashService } from "../domain/hash-service.interface"
import { ITokenService } from "../domain/token-service.interface"


export class LoginUsuarioUseCase {
  constructor(
    private usuarioRepository: IUsuarioRepository,
    private hashService: IHashService,
    private tokenService: ITokenService
  ) {}

  async executar(email: string, senha: string) {
    const usuario = await this.usuarioRepository.buscarPorEmail(email);

    if (!usuario) {
      throw new Error("Credenciais invalidas");
    }

    const senhaValida = await this.hashService.comparar(senha, usuario.senha);

    if (!senhaValida) {
      throw new Error("Credenciais invalidas");
    }

    const emailVerificado = usuario.verificado;
    if (!emailVerificado) {
      throw new Error("Email nao verificado");
    }

    const token = this.tokenService.gerar({ id: usuario.id });
    return token;
  }
}
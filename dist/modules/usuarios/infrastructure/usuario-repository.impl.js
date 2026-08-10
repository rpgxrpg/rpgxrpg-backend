"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepositoryImplementation = void 0;
class UsuarioRepositoryImplementation {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async buscarPorEmail(email) {
        const usuario = await this.prisma.usuario.findUnique({ where: { email } });
        return usuario ? { id: usuario.id, nome: usuario.nome_usuario, email: usuario.email, senha: usuario.senha, verificado: usuario.verificado } : null;
    }
    async salvar(usuario) {
        const created = await this.prisma.usuario.create({
            data: {
                nome_usuario: usuario.nome,
                email: usuario.email,
                senha: usuario.senha
            }
        });
        return { id: created.id, nome: created.nome_usuario, email: created.email, senha: created.senha, verificado: created.verificado };
    }
    async marcarComoVerificado(email) {
        await this.prisma.usuario.update({
            where: { email },
            data: { verificado: true }
        });
    }
}
exports.UsuarioRepositoryImplementation = UsuarioRepositoryImplementation;

import { PrismaClient } from "@prisma/client";
import { IUsuarioRepository } from "../domain/usuario-repository.interface";
import { UsuarioEntity } from "../domain/usuario.entity";

export class UsuarioRepositoryImplementation implements IUsuarioRepository {
    constructor(private prisma: PrismaClient) {}

    async buscarPorEmail(email: string): Promise<UsuarioEntity | null> {
        const usuario = await this.prisma.usuario.findUnique({ where: { email } });
        return usuario ? { id: usuario.id, nome: usuario.nome_usuario, email: usuario.email, senha: usuario.senha } : null;
    }

    async salvar(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        const created = await this.prisma.usuario.create({
            data: {
                nome_usuario: usuario.nome,
                email: usuario.email,
                senha: usuario.senha
            }
        });
        return { id: created.id, nome: created.nome_usuario, email: created.email, senha: created.senha };
    }
}
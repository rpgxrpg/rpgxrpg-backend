"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarUsuarioController = void 0;
class CriarUsuarioController {
    constructor(criarUsuarioUseCase) {
        this.criarUsuarioUseCase = criarUsuarioUseCase;
    }
    async handle(req, res) {
        try {
            const { nome, email, senha } = req.body;
            const token = await this.criarUsuarioUseCase.executar(nome, email, senha);
            return res.status(201).json({ token });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.CriarUsuarioController = CriarUsuarioController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarCampanhaController = void 0;
class CriarCampanhaController {
    constructor(criarCampanhaUseCase) {
        this.criarCampanhaUseCase = criarCampanhaUseCase;
    }
    async handle(req, res) {
        try {
            const { titulo, numero, status } = req.body;
            const criado_por = req.userId;
            if (typeof criado_por !== 'number') {
                return res.status(401).json({ message: 'ID de Usuario invalido.' });
            }
            const campanha = await this.criarCampanhaUseCase.executar(numero, titulo, criado_por, status);
            return res.status(201).json(campanha);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.CriarCampanhaController = CriarCampanhaController;

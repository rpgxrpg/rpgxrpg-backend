"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvidarJogadorController = void 0;
class ConvidarJogadorController {
    constructor(convidarJogadorUseCase) {
        this.convidarJogadorUseCase = convidarJogadorUseCase;
    }
    async handle(req, res) {
        try {
            const campanhaId = Number(req.params.campanhaId);
            const quemConvida = req.userId;
            const email = req.body.email;
            const convite = await this.convidarJogadorUseCase.executar(campanhaId, email, quemConvida);
            return res.status(201).json(convite);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.ConvidarJogadorController = ConvidarJogadorController;

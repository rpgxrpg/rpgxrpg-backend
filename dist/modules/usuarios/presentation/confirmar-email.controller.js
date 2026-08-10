"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmarEmailController = void 0;
class ConfirmarEmailController {
    constructor(confirmarEmailUseCase) {
        this.confirmarEmailUseCase = confirmarEmailUseCase;
    }
    async handle(req, res) {
        try {
            const { token } = req.query;
            if (typeof token !== 'string') {
                return res.status(400).json({ error: "Token inválido" });
            }
            await this.confirmarEmailUseCase.executar(token);
            return res.status(200).json({ message: "E-mail confirmado com sucesso" });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.ConfirmarEmailController = ConfirmarEmailController;

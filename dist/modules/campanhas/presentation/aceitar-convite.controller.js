"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AceitarConviteController = void 0;
class AceitarConviteController {
    constructor(aceitarConviteUseCase) {
        this.aceitarConviteUseCase = aceitarConviteUseCase;
    }
    async handle(req, res) {
        try {
            const conviteId = Number(req.params.conviteId);
            const quemAceita = req.userId;
            await this.aceitarConviteUseCase.executar(conviteId, quemAceita);
            return res.status(200).json({ message: "Convite aceito com sucesso" });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.AceitarConviteController = AceitarConviteController;

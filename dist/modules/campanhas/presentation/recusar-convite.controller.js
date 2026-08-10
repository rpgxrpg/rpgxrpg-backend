"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecusarConviteController = void 0;
class RecusarConviteController {
    constructor(recusarConviteUseCase) {
        this.recusarConviteUseCase = recusarConviteUseCase;
    }
    async handle(req, res) {
        try {
            const conviteId = Number(req.params.conviteId);
            const quemRecusa = req.userId;
            await this.recusarConviteUseCase.executar(conviteId, quemRecusa);
            return res.status(200).json({ message: "Convite recusado com sucesso" });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.RecusarConviteController = RecusarConviteController;

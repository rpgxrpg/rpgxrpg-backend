"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUsuarioController = void 0;
class LoginUsuarioController {
    constructor(loginUsuarioUseCase) {
        this.loginUsuarioUseCase = loginUsuarioUseCase;
    }
    async handle(req, res) {
        try {
            const { email, senha } = req.body;
            const token = await this.loginUsuarioUseCase.executar(email, senha);
            return res.status(200).json({ token });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.LoginUsuarioController = LoginUsuarioController;

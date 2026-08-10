"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarAuthMiddleware = criarAuthMiddleware;
function criarAuthMiddleware(tokenService) {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Token nao fornecido' });
        }
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token nao fornecido' });
        }
        const token = authHeader.slice(7);
        try {
            const payload = tokenService.verificar(token);
            req.userId = payload.id;
            return next();
        }
        catch (error) {
            return res.status(401).json({ message: 'Token invalido' });
        }
    };
}

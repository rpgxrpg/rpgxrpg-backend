import { Request, Response, NextFunction } from 'express';
import { ITokenService } from "../../modules/usuarios/domain/token-service.interface"

export function criarAuthMiddleware(tokenService: ITokenService) {
    return (req: Request, res: Response, next: NextFunction) => {
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
            (req as any).userId = (payload as { id: number }).id;
            return next();
        } catch (error) {
            return res.status(401).json({ message: 'Token invalido' });
        }
    }
}
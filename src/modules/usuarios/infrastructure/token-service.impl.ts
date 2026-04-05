import jwt from "jsonwebtoken"
import { ITokenService } from "../domain/token-service.interface";

export class TokenServiceImplementation implements ITokenService {
    gerar(payload: object): string {
        return jwt.sign(payload, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" })
    }
    verificar(token: string): object {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret")
            return decoded as object
        } catch (error) {
            throw new Error("Token inválido")
        }
    }
}
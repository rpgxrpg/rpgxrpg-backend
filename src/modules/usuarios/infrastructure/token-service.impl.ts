import jwt from "jsonwebtoken"
import { ITokenService } from "../domain/token-service.interface";

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET nao configurado")
}

export class TokenServiceImplementation implements ITokenService {
    gerar(payload: object): string {
        return jwt.sign(payload, JWT_SECRET as string, { expiresIn: "1h" })
    }
    verificar(token: string): object {
        try {
            const decoded = jwt.verify(token, JWT_SECRET as string)
            return decoded as object
        } catch (error) {
            throw new Error("Token invalido")
        }
    }
}
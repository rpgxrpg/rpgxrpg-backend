"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenServiceImplementation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET nao configurado");
}
class TokenServiceImplementation {
    gerar(payload) {
        return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    }
    verificar(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            return decoded;
        }
        catch (error) {
            throw new Error("Token invalido");
        }
    }
}
exports.TokenServiceImplementation = TokenServiceImplementation;

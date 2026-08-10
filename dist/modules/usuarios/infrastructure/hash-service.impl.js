"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashServiceImplementation = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class HashServiceImplementation {
    async hash(senha) {
        const salt = await bcryptjs_1.default.genSalt(10);
        return bcryptjs_1.default.hash(senha, salt);
    }
    async comparar(senha, hash) {
        const isMatch = await bcryptjs_1.default.compare(senha, hash);
        return isMatch;
    }
}
exports.HashServiceImplementation = HashServiceImplementation;

import bcrypt from "bcryptjs";
import { IHashService } from "../domain/hash-service.interface";

export class HashServiceImplementation implements IHashService {
    async hash(senha: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(senha, salt);
    }
    async comparar(senha: string, hash: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(senha, hash);
        return isMatch;
    }
}
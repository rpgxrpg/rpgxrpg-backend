export interface IEmailService {
    enviar(email: string, subject: string, body: string): Promise<void>;
}
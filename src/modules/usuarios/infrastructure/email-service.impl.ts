import { IEmailService } from '../domain/email-service.interface';

export class EmailServiceImplementation implements IEmailService {
  async enviar(destinatario: string, assunto: string, corpo: string): Promise<void> {
    console.log(`Enviando e-mail para: ${destinatario}`);
    console.log(`Assunto: ${assunto}`);
    console.log(`Corpo: ${corpo}`);
  }
}
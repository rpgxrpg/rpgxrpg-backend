"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailServiceImplementation = void 0;
class EmailServiceImplementation {
    async enviar(destinatario, assunto, corpo) {
        console.log(`Enviando e-mail para: ${destinatario}`);
        console.log(`Assunto: ${assunto}`);
        console.log(`Corpo: ${corpo}`);
    }
}
exports.EmailServiceImplementation = EmailServiceImplementation;

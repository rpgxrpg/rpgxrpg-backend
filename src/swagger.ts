import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RPGxRPG API',
      version: '1.0.0',
      description: 'API do backend do RPGxRPG',
    },
    servers: [{ url: 'http://localhost:3000' }],
    tags: [
      { name: 'Usuarios', description: 'Registro, login e confirmação de e-mail' },
      { name: 'Campanhas', description: 'Criação e gestão de campanhas' },
      { name: 'Convites', description: 'Aceitar e recusar convites de campanha' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
        Message: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
        TokenResponse: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
        },
        CriarUsuarioRequest: {
          type: 'object',
          required: ['nome', 'email', 'senha'],
          properties: {
            nome: { type: 'string', example: 'Mestre RPG' },
            email: { type: 'string', format: 'email', example: 'mestre@email.com' },
            senha: { type: 'string', format: 'password', example: 'senha123' },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'senha'],
          properties: {
            email: { type: 'string', format: 'email', example: 'mestre@email.com' },
            senha: { type: 'string', format: 'password', example: 'senha123' },
          },
        },
        StatusCampanha: {
          type: 'string',
          enum: ['ativa', 'suspensa', 'encerrada'],
        },
        StatusConvite: {
          type: 'string',
          enum: ['aceito', 'recusado', 'pendente'],
        },
        Campanha: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            numero: { type: 'integer', example: 1 },
            titulo: { type: 'string', example: 'Campanha dos Heróis' },
            criado_por: { type: 'integer', example: 1 },
            status: { $ref: '#/components/schemas/StatusCampanha' },
          },
        },
        CriarCampanhaRequest: {
          type: 'object',
          required: ['titulo', 'numero', 'status'],
          properties: {
            titulo: { type: 'string', example: 'Campanha dos Heróis' },
            numero: { type: 'integer', example: 1 },
            status: { $ref: '#/components/schemas/StatusCampanha' },
          },
        },
        Convite: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            campanha_id: { type: 'integer', example: 1 },
            usuario_id: { type: 'integer', example: 2 },
            status: { $ref: '#/components/schemas/StatusConvite' },
          },
        },
        ConvidarJogadorRequest: {
          type: 'object',
          required: ['email'],
          properties: {
            email: { type: 'string', format: 'email', example: 'jogador@email.com' },
          },
        },
      },
    },
  },
  apis: ['./src/modules/**/presentation/*.routes.ts'],
}

export const swaggerSpec = swaggerJsdoc(options)

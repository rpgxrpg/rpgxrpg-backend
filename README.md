# ⚙️ RPGxRPG — Backend

API REST para o sistema de RPG de mesa baseado em *Hunter x Hunter*, de Yoshihiro Togashi.

## 🛠️ Stack

- Node.js + TypeScript
- Express
- PostgreSQL 16 (Docker)
- Prisma ORM

## 🏛️ Arquitetura

Clean Architecture em 4 camadas:
`Presentation → Application → Domain → Infrastructure`

## 🚀 Como rodar localmente
```bash
# Sobe o banco
docker-compose up -d

# Instala dependências
npm install

# Roda o servidor
npm run dev
```

## 📄 Documentação

Veja [`rpgxrpg-docs`](https://github.com/rpgxrpg/rpgxrpg-docs) para arquitetura, ADRs e contrato da API.

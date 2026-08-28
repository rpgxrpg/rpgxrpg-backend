# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

RPGxRPG backend — REST API for a tabletop RPG system based on Hunter x Hunter. Node.js + TypeScript + Express + PostgreSQL (Prisma ORM).

## Commands

```bash
docker-compose up -d      # start Postgres (required for db-touching work)
npm install
npm run dev                # tsx watch src/server.ts — dev server with reload
npm run build               # tsc -> dist/
npx tsc --noEmit             # type-check only; this is what CI runs, no test suite exists
npm run db:migrate           # prisma migrate dev
npm run db:generate           # prisma generate (client output is custom, see below)
npm run db:studio              # prisma studio
```

There is no test runner configured (no jest/vitest, no `test` script). CI (`.github/workflows/ci.yml`) only runs `npx prisma generate` + `npx tsc --noEmit` on PRs targeting `main`/`develop`. Treat a clean `tsc --noEmit` as the bar for "compiles"; there's no automated test signal to lean on.

## Architecture

Clean Architecture, organized **by vertical module**, not by horizontal layer:

```
src/modules/<modulo>/{domain,application,infrastructure,presentation}
```

Modules: `usuarios`, `campanhas`, `personagens`. Flow is `Presentation → Application → Domain → Infrastructure`. Each module's routes are composed and mounted in `src/app.ts`; `src/server.ts` just boots `app`.

Full naming/structure conventions live in **`rpgxrpg-backend-conventions.md`** at the repo root — read it before adding files. Key rules from it:

- kebab-case filenames: `<nome>.entity.ts`, `<nome>-repository.interface.ts`, `<acao>.usecase.ts`, `<nome>-repository.impl.ts`, `<acao>.controller.ts`, `<modulo>.routes.ts`.
- **One controller class per action, not per resource** — e.g. `aprovar-personagem.controller.ts` and `rejeitar-personagem.controller.ts` are separate files/classes, never combined into one controller with multiple methods.
- Use case public method is always `executar` (never `execute` or the action's own name).
- Repository `criar` methods always return the full created entity, never `void`.
- Use case guard-clause order: fetch → existence check (throw) → authorization check (throw) → state validity check (throw) → execute.
- Entities mirror Prisma fields 1:1 in snake_case; nullable Prisma fields become `number | null` (not `| undefined`).
- Auth middleware (`src/shared/middlewares/auth.middleware.ts`) sets `(req as any).userId` from the verified JWT — that's how controllers get the current user.
- Cross-module authorization logic (e.g. "is this user the campaign's master?") lives in `src/shared/application/validar-mestre-da-campanha.usecase.ts` and is composed into module use cases rather than duplicated.
- The conventions doc's "known inconsistencies" section (missing `.impl.ts` suffix, missing `.usecase.ts` suffix, one legacy multi-method controller) is stale — all three have since been fixed in code (`alteracao-pendente.repository.impl.ts`, `validar-mestre-da-campanha.usecase.ts`, and separate `aprovar-/rejeitar-/solicitar-alteracao.controller.ts` classes all already exist). No known naming inconsistencies remain; don't be misled by that section.

### Prisma specifics

- Client is generated to `src/generated/prisma` (custom `provider = "prisma-client"` output), so imports are `.../generated/prisma/client` and `.../generated/prisma/enums` — **not** `@prisma/client`. This is intentional; don't "fix" it to the classic import path.
- Schema: `prisma/schema.prisma`. Field mapping uses `@@map` on the model/table only, never `@map` on individual fields.

### Routing

Each module exposes a `<modulo>.routes.ts` that wires repositories → use cases → controllers and registers Express routes with `authMiddleware`. `src/app.ts` mounts them under `/api/...` prefixes. Routes for one module can nest under another module's resource path when the action is owned there (e.g. `personagem.routes.ts` defines routes under `/campanhas/:campanhaId/...` for campaign-scoped personagem queries).

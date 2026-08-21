# RPGxRPG Backend — Convenções

> Referência de nomenclatura e padrões reais do projeto. Gerado a partir da árvore de arquivos existente, não de memória — se o Cursor (ou qualquer IA) for gerar arquivo novo, segue isto.

## Estrutura

Clean Architecture, organizado por módulo vertical (não por camada horizontal):

```
src/modules/<modulo>/{domain,application,infrastructure,presentation}
```

Módulos existentes: `usuarios`, `campanhas`, `personagens`.

## Nomenclatura de arquivos (kebab-case sempre)

| Camada | Padrão | Exemplo real |
|---|---|---|
| domain — entity | `<nome>.entity.ts` | `personagem.entity.ts` |
| domain — repo interface | `<nome>-repository.interface.ts` | `personagem-repository.interface.ts` |
| domain — outro serviço | `<nome>-service.interface.ts` | `hash-service.interface.ts` |
| application — use case | `<acao>.usecase.ts` | `criar-personagem.usecase.ts` |
| infrastructure — repo impl | `<nome>-repository.impl.ts` | `usuario-repository.impl.ts` |
| infrastructure — serviço impl | `<nome>-service.impl.ts` | `hash-service.impl.ts` |
| presentation — controller | `<acao>.controller.ts` | `criar-personagem.controller.ts` |
| presentation — routes | `<modulo>.routes.ts` | `personagem.routes.ts` |

**Controller = 1 classe por ação, não por recurso.** `campanhas` e `personagens` sempre separam (`aprovar-personagem.controller.ts`, `rejeitar-personagem.controller.ts` são arquivos diferentes, não métodos da mesma classe). Não juntar múltiplas ações num controller só.

## Regras de código

- Método público de use case: sempre `executar` — nunca `execute`, nunca o nome da ação.
- `criar` do repositório sempre retorna a entidade completa — nunca `void`.
- Ordem do guard clause em use case: busca → confere existência (throw) → confere autorização (throw) → confere estado válido (throw) → executa.
- Campo nullable vindo do Prisma vira `number | null` na entity — nunca só `| undefined`.
- snake_case em todo campo de entity, batendo 1:1 com o Prisma. Sem `@map` de campo — só `@@map` de tabela.
- Middleware de auth seta `(req as any).userId`.

## Prisma — atenção

- Import do client: `.../generated/prisma/client` — **não** `@prisma/client`.
- Import de enum: `.../generated/prisma/enums`.
- Isso é proposital (`provider = "prisma-client"` customizado, output em `src/generated/prisma`). Se alguma IA sugerir "corrigir" pro padrão clássico, é sempre falso positivo — já confirmado na prática. Rejeitar.

## Inconsistências conhecidas (não copiar como padrão novo)

- `alteracao-pendente.repository.ts` deveria ser `alteracao-pendente.repository.impl.ts` — todo o resto usa `.impl.ts` nessa camada.
- `validar-mestre-da-campanha.ts` (em `campanhas/application/`) deveria ter sufixo `.usecase.ts` — todo outro arquivo de application tem.
- `alteracao-pendente.controller.ts` tem 3 métodos (`solicitar`/`aprovar`/`rejeitar`) numa classe só — foge do padrão de 1 controller por ação.

Essas três existem, funcionam, mas não são o padrão a seguir em módulos novos.

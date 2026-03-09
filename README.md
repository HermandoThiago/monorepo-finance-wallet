# Monorepo Finance Wallet

Gerenciador de carteiras de investimento com geração automatizada de relatórios via IA. Um worker da Cloudflare executa diariamente às 10h, coleta as últimas notícias do mercado via Perplexity e gera um resumo personalizado para cada carteira cadastrada.

## Visão Geral

O sistema permite cadastrar múltiplas carteiras de investimento, cada uma contendo seus ativos (ações, criptomoedas, etc.). Diariamente, um worker automatizado busca notícias relevantes e, utilizando o Perplexity, gera relatórios contextualizados para cada carteira. Os metadados de uso da IA (tokens consumidos, modelo utilizado) são armazenados para controle de custos.

### Fluxo Principal

```
Carteiras → Ativos → Worker (10h diário) → Perplexity (notícias + resumo) → Relatórios
```

## Tech Stack

| Componente | Tecnologia |
|---|---|
| Runtime | Bun |
| Framework | Elysia |
| Linguagem | TypeScript |
| ORM | Drizzle ORM |
| Banco de Dados | SQLite via Cloudflare D1 |
| Deploy | Cloudflare Workers |
| Package Manager | pnpm (workspaces) |

## Estrutura do Monorepo

```
mono-dev/
├── apps/
│   └── wallet-api/          # API principal (Elysia + Cloudflare Workers)
│       ├── src/
│       │   ├── index.ts     # Entry point da aplicação
│       │   └── db/
│       │       ├── index.ts          # Configuração do banco (D1)
│       │       └── schemas/          # Schemas Drizzle
│       ├── drizzle/         # Migrations SQL
│       ├── drizzle.config.ts
│       ├── wrangler.toml    # Configuração do Cloudflare Worker
│       └── .env.template
├── .github/
│   └── pull_request_template.md
├── package.json
└── pnpm-workspace.yaml
```

## Banco de Dados

```
wallets
  └── assets (N:1 → wallet)
  └── wallet_reports (N:1 → wallet)
        └── wallet_report_metadata (N:1 → report)
```

| Tabela | Descrição |
|---|---|
| `wallets` | Carteiras de investimento |
| `assets` | Ativos de cada carteira (ações, cripto, etc.) |
| `wallet_reports` | Relatórios gerados pela IA para cada carteira |
| `wallet_report_metadata` | Metadados de uso da IA (modelo, tokens) |

## Pré-requisitos

- [Bun](https://bun.sh) >= 1.0
- [pnpm](https://pnpm.io) >= 10
- Conta na [Cloudflare](https://cloudflare.com) com D1 habilitado

## Configuração

**1. Instalar dependências**

```bash
pnpm install
```

**2. Configurar variáveis de ambiente**

```bash
cp apps/wallet-api/.env.template apps/wallet-api/.env
```

Preencha o arquivo `.env`:

```env
CLOUDFLARE_ACCOUNT_ID=<seu account id>
CLOUDFLARE_DATABASE_ID=<id do banco D1>
CLOUDFLARE_D1_TOKEN=<token de acesso>
```

**3. Executar migrations**

```bash
cd apps/wallet-api
pnpm db:migrate
```

## Desenvolvimento

```bash
# Iniciar servidor com hot reload
cd apps/wallet-api
pnpm start:dev
```

O servidor sobe em `http://localhost:3000`.

### Comandos úteis

```bash
pnpm db:generate:migration   # Gerar nova migration a partir dos schemas
pnpm db:migrate              # Aplicar migrations no banco
pnpm db:studio               # Abrir Drizzle Studio (UI do banco)
pnpm start:build             # Build + iniciar em produção
```

## Deploy

O projeto roda como Cloudflare Worker. Para fazer o deploy:

```bash
cd apps/wallet-api
bunx wrangler deploy
```

## Worker de Relatórios (Em desenvolvimento)

Um Cloudflare Worker com cron trigger será implementado para executar diariamente às 10h (BRT). O fluxo:

1. Busca todas as carteiras e seus ativos cadastrados
2. Consulta o Perplexity para obter as últimas notícias relevantes para cada conjunto de ativos
3. Gera um resumo personalizado por carteira usando as notícias coletadas
4. Persiste o relatório em `wallet_reports` com os metadados de uso em `wallet_report_metadata`

## Contribuindo

Ao abrir um Pull Request, utilize o template disponível em `.github/pull_request_template.md`. Descreva o contexto da mudança, o tipo de alteração e as instruções para teste.

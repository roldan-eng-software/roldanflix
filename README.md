# RoldanFlix

Aplicacao de filmes em Next.js que consome a API da TMDB por uma rota interna.

## Requisitos

- Node.js compativel com Next.js 16
- Uma chave da TMDB

## Configuracao

Crie um arquivo `.env.local` com:

```bash
TMDB_API_KEY=sua_chave_tmdb
```

Use `.env.example` como referencia.

## Scripts

```bash
npm run dev
npm run build
npm run start
```

## Rotas

- `/` lista filmes em cartaz
- `/filme/[id]` mostra detalhes do filme
- `/favoritos` mostra filmes salvos no `localStorage`
- `/api/tmdb/[...path]` faz proxy server-side para a TMDB

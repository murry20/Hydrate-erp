# Guia de Deploy Remoto (sem Docker)

Objetivo: permitir que o cliente abra o projeto apenas acessando uma URL pública (sem instalar Docker, terminal ou mexer em código).

Resumo das recomendações

- Frontend (build estático): hospedar em Vercel / Netlify / Cloudflare Pages.
- Backend (Node/Express): hospedar em Render / Railway / Heroku (ou serviço similar que suporte Node.js).
- Banco de dados (opcional para produção): Supabase ou um Postgres gerenciado.

Passos mínimos (sem usar credenciais do autor):

1. Preparar Frontend

- No repositório `frontend` já existe o script de build (`npm run build`).
- Conectar repositório ao Vercel ou Netlify e configurar para rodar `npm install` e `npm run build` no diretório `frontend`.
- Após deploy, você terá uma URL pública (ex.: `https://hydrate-erp-frontend.vercel.app`).

2. Preparar Backend

- O backend já expõe uma rota health (`GET /`) e usa `process.env.PORT`.
- Em `backend/package.json` foi adicionado o script `start` para que plataformas iniciem o app com `npm start`.
- Conectar repositório ao Render / Railway / Heroku, apontando o diretório `backend` como a app e configurando variáveis de ambiente necessárias.

Variáveis de ambiente recomendadas (backend)

- `PORT` (opcional, geralmente gerenciado pela plataforma)
- `DATABASE_URL` — string de conexão Postgres (se for usar Supabase/Postgres). Se usar backend mock atual, não é obrigatório.
- `JWT_SECRET` — segredo para tokens JWT (se implementar autenticação real mais tarde).

3. Banco de dados (opcional)

- Para persistência, criar projeto no Supabase e executar `database/schema.sql` (use o SQL editor do Supabase para rodar o schema). Confirme que a extensão para `gen_random_uuid()` está habilitada (pgcrypto ou pgcrypto equivalente).
- Configure `DATABASE_URL` no backend com a string de conexão do Supabase.

4. CORS e origem

- O backend atualmente permite CORS aberto (para facilitar). Se quiser restringir, configure `CORS_ORIGIN` na plataforma e ajuste `server.js`.

5. Opção: eu faço o deploy para você

- Posso realizar o deploy se você me fornecer acesso (token ou adicionar meu repositório como colaborador). Alternativamente, posso gerar instruções passo-a-passo com imagens e textos para você executar.

6. Testes finais

- Após deploy do backend e frontend, abra a URL do frontend e verifique login com as credenciais de teste:
  - `admin@hydrate.com` / `admin123`
  - `funcionario@hydrate.com` / `func123`

Se quiser, eu posso:

- Fazer o deploy completo (preciso de credenciais de um dos serviços), ou
- Gerar um guia passo-a-passo mais detalhado para cada provedor (Vercel, Render, Supabase) com comandos e capturas de tela.

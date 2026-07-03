# Seed e migração (backend)

Esses scripts ajudam a aplicar o `database/schema.sql` e a criar usuários iniciais no banco remoto.

Pré-requisitos

- Ter `node` e `npm` instalados.
- Ter a variável de ambiente `DATABASE_URL` configurada apontando para o Postgres remoto.

Comandos

- Instalar dependências do backend (uma vez):

```bash
cd backend
npm install
```

- Aplicar schema (cria tabelas e triggers):

```bash
DATABASE_URL="postgres://user:pass@host:port/dbname" npm run migrate
```

- Seedar usuários iniciais (cria `admin@hydrate.com` e `funcionario@hydrate.com` e um `owner`):

```bash
DATABASE_URL="postgres://user:pass@host:port/dbname" npm run seed
```

Você pode trocar o e-mail/senha do proprietário passando variáveis:

```bash
PROPRIETARIO_EMAIL="seu-email@dominio.com" PROPRIETARIO_PASSWORD="senha123" DATABASE_URL="..." npm run seed
```

Notas de segurança

- Não comite `DATABASE_URL` ou senhas no repositório.
- Depois de criar as contas, peça para mudar senhas ou implemente reset por e-mail em produção.

# Iniciador (duplo-clique)

Objetivo: permitir que um usuário não técnico inicie o projeto localmente com um duplo-clique.

Arquivos incluídos:

- `run-windows.bat` — para Windows (duplo-clique no Explorer).
- `run-unix.sh` — para macOS/Linux (duplo-clique ou execute via terminal; torne o script executável com `chmod +x run-unix.sh`).

Pré-requisitos mínimos (no computador do cliente):

- Node.js (versão 18+ recomendada) e npm instalados globalmente.
- Portas padrão livres: `5173` (frontend Vite) e `5000` (backend Express).

Como usar:
Windows: dê duplo-clique em `run-windows.bat`. Ele instalará dependências se necessário, iniciará backend e frontend em janelas minimizadas e abrirá o navegador em `http://localhost:5173`.
macOS/Linux: torne executável e dê duplo-clique, ou rode:

```bash
chmod +x run-unix.sh
./run-unix.sh
```

Executar local (após refactor para ESM):

Se quiser iniciar o backend e o frontend simultaneamente usando o script Node centralizado, rode a partir da raiz do repositório:

```bash
cd backend
npm install
npm run start:local
```

O comando `npm run start:local` inicia o backend (`node src/index.js`) e o frontend (`npm run dev` na pasta `frontend`) e abre `http://localhost:5173` no navegador padrão.

Observações importantes:

- Estes scripts não substituem um processo de deploy em produção — são para uso local/preview.
- Se preferir que o cliente não veja nenhuma janela de terminal, a alternativa é fazer deploy remoto e fornecer uma URL pública (recomendado para entregas a clientes não técnicos).
- Caso o projeto exija um banco Postgres local, será preciso instalar e configurar o PostgreSQL no computador do cliente — os scripts não instalam DB automaticamente.

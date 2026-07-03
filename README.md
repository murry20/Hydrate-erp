# 🥤 Hydrate ERP - Dashboard

Um sistema de gerenciamento de pedidos e estoque completo e moderno, desenvolvido com **React + Vite** no frontend e **Node.js + Express** no backend.

## 📋 Visão Geral

O **Hydrate ERP** é uma solução robusta para empresas que precisam gerenciar pedidos, produtos e controlar estoque em tempo real. Com uma interface intuitiva e um backend poderoso, facilita operações diárias e tomadas de decisão.

## ✨ Principais Funcionalidades

- 🔐 **Autenticação e Controle de Acesso (RBAC)** - Sistema de usuários com níveis de permissão
- 📊 **Dashboard Executivo** - Visualização rápida de métricas e KPIs
- 📦 **Gerenciamento de Produtos** - CRUD completo de produtos
- 🛒 **Gerenciamento de Pedidos** - Criação, edição e acompanhamento de pedidos
- 📈 **Controle de Estoque** - Monitoramento em tempo real de inventário
- 🎨 **Interface Responsiva** - Design moderno com CSS Modules
- ⚡ **Otimizado** - Vite para build rápido

## 🛠️ Tecnologias

### Frontend

- **React 18** - Biblioteca UI
- **Vite** - Build tool
- **CSS Modules** - Estilização modular
- **ESLint** - Linting

### Backend

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **SQL** - Banco de dados relacional

## 📦 Instalação

### Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- MySQL ou PostgreSQL

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse: `http://localhost:5173`

### Backend

```bash
cd backend
npm install
node server.js
```

O servidor rodará em `http://localhost:3000` (ou porta configurada)

## 🗄️ Banco de Dados

Para configurar o banco de dados:

```bash
cd database
# Execute o arquivo schema.sql no seu cliente SQL
mysql -u usuario -p banco_dados < schema.sql
```

## 📁 Estrutura do Projeto

```
hydrate-erp/
├── frontend/              # Aplicação React
│   ├── src/
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── pages/        # Páginas principais
│   │   ├── layouts/      # Layouts
│   │   └── assets/       # Imagens e arquivos estáticos
│   └── package.json
├── backend/               # API Express
│   ├── controllers/      # Lógica de negócio
│   ├── routes/           # Definição de rotas
│   ├── services/         # Serviços auxiliares
│   └── server.js
├── database/             # Scripts SQL
│   └── schema.sql
└── README.md
```

## 🔧 Configuração

### Variáveis de Ambiente (Backend)

Crie um arquivo `.env` na pasta `backend`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=hydrate_db
JWT_SECRET=sua_chave_secreta
```

## 🚀 Scripts Disponíveis

### Frontend

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build para produção
- `npm run preview` - Visualiza build de produção
- `npm run lint` - Executa linter

### Backend

- `node server.js` - Inicia o servidor
- `node scaffold.js` - Configura estrutura inicial
- `node scaffold_rbac.js` - Configura RBAC
- `node scaffold_friday.js` - Dados de exemplo

## 📚 API Endpoints

### Autenticação

- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Produtos

- `GET /api/products` - Listar produtos
- `POST /api/products` - Criar produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Deletar produto

### Pedidos

- `GET /api/orders` - Listar pedidos
- `POST /api/orders` - Criar pedido
- `PUT /api/orders/:id` - Atualizar pedido
- `DELETE /api/orders/:id` - Deletar pedido

### Dashboard

- `GET /api/dashboard/metrics` - Métricas gerais

## 🤝 Como Contribuir

1. Faça um **Fork** do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

## 📄 Licença

Este projeto está sob a licença **MIT** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**murry20** - [GitHub](https://github.com/murry20)

## 📧 Suporte

Para dúvidas ou sugestões, abra uma [Issue](../../issues) no repositório.

---

**Desenvolvido com ❤️ por murry20**

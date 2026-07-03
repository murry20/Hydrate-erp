# Hydrate ERP

## Visão Geral

O Hydrate ERP é uma solução de gestão integrada para e-commerce de autopeças, focada no controle de pedidos e inventário em tempo real. O sistema foi projetado para otimizar operações diárias e apoiar a tomada de decisão através de métricas precisas.

## Funcionalidades Principais

- **Controle de Acesso (RBAC):** Sistema de autenticação com níveis de permissão granulares.
- **Dashboard Executivo:** Monitoramento centralizado de KPIs e métricas operacionais.
- **Gestão de Inventário:** Controle de estoque em tempo real.
- **Gestão de Pedidos:** Fluxo completo para criação, edição e rastreamento de pedidos.
- **Gestão de Produtos:** CRUD completo para catálogo de peças.

## Stack Tecnológica

### Frontend

- **Framework:** React 18
- **Build Tool:** Vite
- **Estilização:** CSS Modules
- **Qualidade de Código:** ESLint

### Backend

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Persistência:** SQL (MySQL/PostgreSQL)

## Instalação

### Pré-requisitos

- Node.js (v18 ou superior)
- Gerenciador de pacotes npm ou yarn
- Servidor de banco de dados (MySQL ou PostgreSQL)

### Configuração do Frontend

1. Navegue até a pasta: `cd frontend`
2. Instale as dependências: `npm install`
3. Inicie o ambiente de desenvolvimento: `npm run dev`

### Configuração do Backend

1. Navegue até a pasta: `cd backend`
2. Instale as dependências: `npm install`
3. Configure o arquivo `.env` (baseado no template abaixo)
4. Inicie o servidor: `node server.js`

### Banco de Dados

Para inicializar a estrutura, execute o schema no seu cliente SQL:

```bash
mysql -u [usuario] -p [banco_dados] < database/schema.sql
```

## Configuração de Ambiente (Backend)

Crie um arquivo `.env` na pasta `/backend` com as seguintes variáveis:

```env
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=hydrate_db
JWT_SECRET=sua_chave_secreta
```

_Nota: Nunca versionar o arquivo .env no repositório._

## Scripts Disponíveis

### Frontend

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera o build de produção.
- `npm run lint`: Executa a análise estática de código.

### Backend

- `node server.js`: Inicia a API.
- `node scaffold.js`: Inicializa a estrutura do projeto.
- `node scaffold_rbac.js`: Configura as permissões de acesso.
- `node scaffold_friday.js`: Injeta dados de demonstração.

## Roadmap de Desenvolvimento

- [ ] Integração com API do WooCommerce.
- [ ] Implementação de busca avançada por código OEM.
- [ ] Módulo de geração de etiquetas de envio.

## Licença

Distribuído sob a licença MIT. Consulte `LICENSE` para mais informações.

## Contato

Desenvolvido por **murry20**. Para dúvidas ou relatórios de bugs, por favor, abra uma _Issue_ no repositório.

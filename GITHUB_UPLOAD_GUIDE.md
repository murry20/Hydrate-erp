# 📤 Guia de Upload para GitHub

## Passo 1: Inicializar Git no Projeto

```bash
cd c:\Users\muryl\OneDrive\Desktop\hydrate-erp
git init
git add .
git commit -m "Initial commit: Hydrate ERP Dashboard"
```

## Passo 2: Criar Repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Preencha os dados:
   - **Repository name:** `Dashboard`
   - **Description:** Um sistema ERP completo com gerenciamento de pedidos e estoque
   - **Public** (para ser visível no seu portfólio)
   - **Add a README file:** Deixe **desmarcado** (já criamos um)
   - **Add .gitignore:** Deixe **desmarcado** (já criamos um)
3. Clique em **Create repository**

## Passo 3: Adicionar Remote e Fazer Push

Após criar o repositório, GitHub vai mostrar os comandos. Execute:

```bash
git branch -M main
git remote add origin https://github.com/murry20/Dashboard.git
git push -u origin main
```

**Alternativa SSH (se preferir):**

```bash
git remote add origin git@github.com:murry20/Dashboard.git
git push -u origin main
```

## Passo 4: Criar Portfólio GitHub (Opcional mas Recomendado)

Para criar um site de portfólio no GitHub Pages:

1. Crie um novo repositório chamado `murry20.github.io`
2. Clone localmente
3. Adicione seu portfólio (HTML/React/Next.js)
4. Faça push

Seu portfólio estará em: `https://murry20.github.io`

### Exemplo Mínimo de Portfólio

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>murry20 - Portfólio</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      }
      header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 3rem;
        text-align: center;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }
      .projects {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
      }
      .project-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      .project-card h3 {
        margin-bottom: 0.5rem;
        color: #667eea;
      }
      .project-card p {
        color: #666;
        margin-bottom: 1rem;
      }
      .btn {
        display: inline-block;
        background: #667eea;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        text-decoration: none;
        font-weight: bold;
      }
      .btn:hover {
        background: #764ba2;
      }
      footer {
        text-align: center;
        padding: 2rem;
        color: #666;
        border-top: 1px solid #ddd;
        margin-top: 3rem;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>👋 Bem-vindo ao meu Portfólio</h1>
      <p>Desenvolvedor Full Stack | React | Node.js | SQL</p>
    </header>

    <div class="container">
      <h2>📁 Meus Projetos</h2>

      <div class="projects">
        <div class="project-card">
          <h3>🥤 Hydrate ERP Dashboard</h3>
          <p>
            Sistema completo de gerenciamento de pedidos e estoque com
            autenticação RBAC, desenvolvido em React + Node.js.
          </p>
          <a href="https://github.com/murry20/Dashboard" class="btn"
            >Ver no GitHub</a
          >
        </div>
      </div>
    </div>

    <footer>
      <p>
        &copy; 2024 murry20 | GitHub:
        <a href="https://github.com/murry20">github.com/murry20</a>
      </p>
    </footer>
  </body>
</html>
```

## Checklist Final

- [ ] Arquivo `.gitignore` criado
- [ ] `README.md` criado
- [ ] `LICENSE` adicionado
- [ ] Git inicializado localmente
- [ ] Repositório criado no GitHub
- [ ] Remote adicionado
- [ ] Código enviado (push)
- [ ] Repositório visível em `github.com/murry20/Dashboard`

## 🚀 Próximos Passos

1. **Adicione badges ao README** para mostrar tecnologias
2. **Crie releases** com versões do projeto
3. **Adicione CI/CD** com GitHub Actions (opcional)
4. **Mantenha atualizado** com novos commits

Sucesso! 🎉

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

// 1. Inicializa o Express
const app = express();
const server = http.createServer(app);

// 2. Configura o Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // URL do seu frontend Vite
    methods: ["GET", "POST"]
  }
});

// Disponibiliza o 'io' globalmente nas requisições (para os controllers usarem)
app.set('io', io);

// 3. Middlewares Globais de Monitoramento (Prometheus) - Devem vir ANTES das rotas!
try {
  const { client, httpRequestsTotal, httpRequestDuration } = require('./monitoring/metrics');
  
  app.use((req, res, next) => {
    const end = httpRequestDuration.startTimer();
    res.on('finish', () => {
      httpRequestsTotal.inc({ method: req.method, route: req.path, status: res.statusCode });
      end({ method: req.method, route: req.path, status: res.statusCode });
    });
    next();
  });

  // Endpoint de métricas para o Prometheus ler
  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  });
} catch (e) {
  console.log("⚠️ Arquivo de métricas não encontrado, pulando monitoramento.");
}

// 4. Middlewares de Segurança e Parse
app.use(cors());
app.use(express.json());

// Rota base de teste
app.get('/', (req, res) => {
  res.send('Hydrate ERP API rodando com Socket.io e Monitoramento!');
});

// 5. Registro de TODAS as suas Rotas do Sistema
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

const produtosRoutes = require('./routes/produtosRoutes');
app.use('/api/produtos', produtosRoutes);

const clientesRoutes = require('./routes/clientesRoutes');
app.use('/api/clientes', clientesRoutes);

const vendasRoutes = require('./routes/vendasRoutes');
app.use('/api/vendas', vendasRoutes);

const despesasRoutes = require('./routes/despesasRoutes');
app.use('/api/despesas', despesasRoutes);

const financeRoutes = require('./routes/financeRoutes');
app.use('/api/financeiro', financeRoutes);

// Unifiquei os relatórios. Se 'reportRoutes' for o mais novo, use ele!
const relatoriosRoutes = require('./routes/relatoriosRoutes');
app.use('/api/relatorios', relatoriosRoutes);


// 6. Inicialização ÚNICA do Servidor na Porta 5000
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 Hydrate-ERP rodando com SUCESSO na porta ${PORT}`);
  console.log(`🐳 Banco de Dados, Prometheus e Grafana ativos via Docker`);
  console.log(`==================================================`);
});

const { client, httpRequestsTotal, httpRequestDuration } = require('./monitoring/metrics');

app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    httpRequestsTotal.inc({ method: req.method, route: req.path, status: res.statusCode });
    end({ method: req.method, route: req.path, status: res.statusCode });
  });
  next();
});

// Endpoint de métricas para Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

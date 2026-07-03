const client = require('prom-client');

// Coletores padrão (CPU, memória, etc.)
client.collectDefaultMetrics();

// Métrica personalizada: requisições HTTP
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de requisições HTTP',
  labelNames: ['method', 'route', 'status']
});

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duração das requisições HTTP em segundos',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

module.exports = { client, httpRequestsTotal, httpRequestDuration };
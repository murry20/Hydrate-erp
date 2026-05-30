import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Bar, Line, Pie } from 'react-chartjs-2';

function Dashboard() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    api.get('/relatorios/financeiro').then(res => setDados(res.data));
  }, []);

  if (!dados) return <p>Carregando...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Lucro líquido */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Lucro Líquido</h2>
        <p className="text-2xl text-green-600">R$ {dados.lucroLiquido.toFixed(2)}</p>
      </div>

      {/* Total de vendas vs despesas */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Vendas x Despesas</h2>
        <Bar data={{
          labels: ['Vendas', 'Despesas'],
          datasets: [{
            label: 'Valores',
            data: [dados.totalVendas, dados.totalDespesas],
            backgroundColor: ['rgba(54,162,235,0.6)', 'rgba(255,99,132,0.6)']
          }]
        }} />
      </div>

      {/* Comparativo mensal */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Vendas no Mês</h2>
        <Line data={{
          labels: ['Mês Atual'],
          datasets: [{
            label: 'Total',
            data: [dados.totalMes],
            borderColor: 'rgba(75,192,192,1)',
            fill: false
          }]
        }} />
      </div>

      {/* Produto mais lucrativo */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Produto Mais Lucrativo</h2>
        <p className="text-lg text-indigo-600">{dados.produtoMaisLucrativo}</p>
      </div>
    </div>
  );
}

export default Dashboard;

{/* Margem de Lucro */}
<div className="bg-white shadow-lg rounded-lg p-4">
  <h2 className="text-xl font-bold mb-4">Margem de Lucro</h2>
  <Bar data={{
    labels: ['Lucro Líquido'],
    datasets: [{
      label: 'R$',
      data: [dados.lucroLiquido],
      backgroundColor: 'rgba(75,192,192,0.6)'
    }]
  }} options={{
    plugins: {
      tooltip: { callbacks: { label: ctx => `R$ ${ctx.raw.toFixed(2)}` } }
    }
  }} />
</div>

{/* Vendas Totais */}
<div className="bg-white shadow-lg rounded-lg p-4">
  <h2 className="text-xl font-bold mb-4">Vendas Totais</h2>
  <Line data={{
    labels: ['Mês Atual', 'Ano Atual'],
    datasets: [{
      label: 'Vendas',
      data: [dados.totalMes, dados.totalAno],
      borderColor: 'rgba(54,162,235,1)',
      backgroundColor: 'rgba(54,162,235,0.2)',
      fill: true
    }]
  }} options={{
    plugins: {
      tooltip: { callbacks: { label: ctx => `R$ ${ctx.raw.toFixed(2)}` } }
    }
  }} />
</div>
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Filters from './Filters';

function Dashboard() {
  const [dados, setDados] = useState(null);

  const carregarDados = (filtro = null) => {
    let url = '/relatorios/financeiro';
    if (filtro) {
      url = `/relatorios/financeiro/filtrado?inicio=${filtro.inicio}&fim=${filtro.fim}`;
    }
    api.get(url).then(res => setDados(res.data));
  };

  useEffect(() => {
    carregarDados();
  }, []);

  if (!dados) return <p>Carregando...</p>;

  return (
    <div>
      <Filters onFilter={carregarDados} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Lucro Líquido</h2>
          <p className="text-2xl text-green-600">R$ {dados.lucroLiquido.toFixed(2)}</p>
        </div>
        {/* outros gráficos continuam aqui */}
      </div>
    </div>
  );
}

export default Dashboard;

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Filters from './Filters';

function Dashboard() {
  const [dados, setDados] = useState(null);

  const carregarDados = (filtro = null) => {
    let url = '/relatorios/financeiro';
    if (filtro?.inicio && filtro?.fim) {
      url = `/relatorios/financeiro/filtrado?inicio=${filtro.inicio}&fim=${filtro.fim}`;
    }
    if (filtro?.clienteId) {
      url = `/relatorios/financeiro/cliente?clienteId=${filtro.clienteId}`;
    }
    if (filtro?.produtoId) {
      url = `/relatorios/financeiro/produto?produtoId=${filtro.produtoId}`;
    }
    api.get(url).then(res => setDados(res.data));
  };

  useEffect(() => {
    carregarDados();
  }, []);

  if (!dados) return <p>Carregando...</p>;

  return (
    <div>
      <Filters onFilter={carregarDados} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Lucro / Vendas</h2>
          <p className="text-2xl text-green-600">R$ {dados.totalVendas?.toFixed(2) || dados.lucroLiquido?.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

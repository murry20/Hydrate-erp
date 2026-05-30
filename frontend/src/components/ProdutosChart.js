import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Bar } from 'react-chartjs-2';

function ProdutosChart() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    api.get('/relatorios/produtos').then(res => setDados(res.data));
  }, []);

  if (!dados.length) return <p>Carregando...</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Produtos Mais Lucrativos</h2>
      <Bar data={{
        labels: dados.map(p => p.produto),
        datasets: [{
          label: 'Total Vendas (R$)',
          data: dados.map(p => p.total),
          backgroundColor: 'rgba(153, 102, 255, 0.6)'
        }]
      }} options={{
        plugins: {
          tooltip: { callbacks: { label: ctx => `R$ ${ctx.raw.toFixed(2)}` } }
        }
      }} />
    </div>
  );
}

export default ProdutosChart;

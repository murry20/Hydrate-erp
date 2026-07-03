import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Pie } from 'react-chartjs-2';

function RegioesChart() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    api.get('/relatorios/regioes').then(res => setDados(res.data));
  }, []);

  if (!dados.length) return <p>Carregando...</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Regiões que Mais Vendem</h2>
      <Pie data={{
        labels: dados.map(r => r.regiao),
        datasets: [{
          label: 'Total Vendas (R$)',
          data: dados.map(r => r.total),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ]
        }]
      }} options={{
        plugins: {
          tooltip: { callbacks: { label: ctx => `R$ ${ctx.raw.toFixed(2)}` } }
        }
      }} />
    </div>
  );
}

export default RegioesChart;

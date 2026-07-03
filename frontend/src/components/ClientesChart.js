import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Bar } from 'react-chartjs-2';

function ClientesChart() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    api.get('/relatorios/clientes').then(res => setDados(res.data));
  }, []);

  if (!dados.length) return <p>Carregando...</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Clientes que Mais Compram</h2>
      <Bar data={{
        labels: dados.map(c => c.empresa || c.nome),
        datasets: [{
          label: 'Total Compras (R$)',
          data: dados.map(c => c.totalCompras),
          backgroundColor: 'rgba(255, 206, 86, 0.6)'
        }]
      }} options={{
        plugins: {
          tooltip: { callbacks: { label: ctx => `R$ ${ctx.raw.toFixed(2)}` } }
        }
      }} />
    </div>
  );
}

export default ClientesChart;

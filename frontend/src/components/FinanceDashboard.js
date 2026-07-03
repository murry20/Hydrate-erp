import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Doughnut } from 'react-chartjs-2';

function FinanceDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/financeiro/estatisticas').then(res => setStats(res.data));
  }, []);

  if (!stats) return <p>Carregando...</p>;

  const data = {
    labels: ['Receitas', 'Despesas'],
    datasets: [
      {
        data: [stats.totalReceitas, stats.totalDespesas],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['#36a2eb', '#ff6384'],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Dashboard Financeiro</h2>
      <Doughnut data={data} />
      <div className="mt-4">
        <p><strong>Total Receitas:</strong> R$ {stats.totalReceitas.toFixed(2)}</p>
        <p><strong>Total Despesas:</strong> R$ {stats.totalDespesas.toFixed(2)}</p>
        <p><strong>Saldo:</strong> R$ {stats.saldo.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default FinanceDashboard;

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Line } from 'react-chartjs-2';

function LoginStatsChart() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/estatisticas-login').then(res => setStats(res.data));
  }, []);

  if (!stats) return <p>Carregando...</p>;

  const labels = Object.keys(stats);
  const data = {
    labels,
    datasets: [
      {
        label: 'Logins por dia',
        data: Object.values(stats),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Estatísticas de Login (últimos 7 dias)</h2>
      <Line data={data} />
    </div>
  );
}

export default LoginStatsChart;

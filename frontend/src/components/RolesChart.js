import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Pie } from 'react-chartjs-2';

function RolesChart() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/estatisticas').then(res => setStats(res.data));
  }, []);

  if (!stats) return <p>Carregando...</p>;

  const data = {
    labels: ['Admins', 'Users'],
    datasets: [
      {
        data: [stats.admins, stats.users],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: ['#ff6384', '#36a2eb'],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Distribuição de Roles</h2>
      <Pie data={data} />
    </div>
  );
}

export default RolesChart;

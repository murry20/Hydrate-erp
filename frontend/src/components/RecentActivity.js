import React, { useEffect, useState } from 'react';
import api from '../services/api';

function RecentActivity() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    api.get('/admin/atividade-recente').then(res => setUsuarios(res.data));
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">Atividade Recente</h2>
      <ul>
        {usuarios.map(u => (
          <li key={u.id} className="border-b py-2">
            <p className="font-semibold">{u.nome} ({u.role})</p>
            <p className="text-sm text-gray-600">{u.email}</p>
            <p className="text-xs text-gray-400">Registrado em: {new Date(u.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentActivity;

import React, { useEffect, useState } from 'react';
import api from '../services/api';

function FailedLoginLogs() {
  const [falhas, setFalhas] = useState([]);

  useEffect(() => {
    api.get('/admin/falhas-login').then(res => setFalhas(res.data));
  }, []);

  return (
    <div className="bg-red-100 shadow-lg rounded-lg p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">Falhas de Login</h2>
      <ul>
        {falhas.map(f => (
          <li key={f.id} className="border-b py-2">
            <p className="font-semibold">Email: {f.email}</p>
            <p className="text-sm text-gray-600">Motivo: {f.motivo}</p>
            <p className="text-xs text-gray-400">Data: {new Date(f.dataTentativa).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FailedLoginLogs;

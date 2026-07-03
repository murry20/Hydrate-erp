import React, { useEffect, useState } from 'react';
import api from '../services/api';

function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get('/admin/logs').then(res => setLogs(res.data));
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">Logs de Auditoria</h2>
      <ul>
        {logs.map(log => (
          <li key={log.id} className="border-b py-2">
            <p className="font-semibold">{log.acao}</p>
            <p className="text-sm text-gray-600">{log.detalhes}</p>
            <p className="text-xs text-gray-400">Data: {new Date(log.dataAcao).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuditLogs;

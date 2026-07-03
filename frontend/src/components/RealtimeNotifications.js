import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function RealtimeNotifications() {
  const [notificacoes, setNotificacoes] = useState([]);
  const socket = io("http://localhost:5000");

  useEffect(() => {
    socket.on('novoUsuario', data => {
      setNotificacoes(prev => [...prev, `Novo usuário registrado: ${data.nome} (${data.email})`]);
    });

    socket.on('loginUsuario', data => {
      setNotificacoes(prev => [...prev, `Login realizado: ${data.email} em ${new Date(data.data).toLocaleString()}`]);
    });

    socket.on('acaoAdmin', data => {
      setNotificacoes(prev => [...prev, `Ação administrativa: ${data.acao} - ${data.detalhes}`]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="bg-yellow-100 shadow-lg rounded-lg p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">Notificações em Tempo Real</h2>
      <ul>
        {notificacoes.map((n, i) => (
          <li key={i} className="border-b py-2">{n}</li>
        ))}
      </ul>
    </div>
  );
}

export default RealtimeNotifications;

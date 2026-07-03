import React, { useEffect, useState } from 'react';
import api from '../services/api';
import LogoutButton from '../components/LogoutButton';

function AdminDashboard() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    api.get('/admin/usuarios').then(res => setUsuarios(res.data));
  }, []);

  const atualizarRole = async (id, role) => {
    await api.put(`/admin/usuarios/${id}/role`, { role });
    setUsuarios(usuarios.map(u => u.id === id ? { ...u, role } : u));
  };

  const excluirUsuario = async (id) => {
    await api.delete(`/admin/usuarios/${id}`);
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <LogoutButton />
      <table className="w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Nome</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id} className="border-b">
              <td className="p-2">{u.id}</td>
              <td className="p-2">{u.nome}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">
                <select value={u.role} onChange={e => atualizarRole(u.id, e.target.value)} className="border rounded p-1">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="p-2">
                <button onClick={() => excluirUsuario(u.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import LogoutButton from '../components/LogoutButton';

function AdminDashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/usuarios').then(res => setUsuarios(res.data));
    api.get('/admin/estatisticas').then(res => setStats(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <LogoutButton />

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold">Total Usuários</h2>
            <p className="text-2xl">{stats.totalUsuarios}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold">Admins</h2>
            <p className="text-2xl">{stats.admins} ({stats.porcentagemAdmins}%)</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold">Users</h2>
            <p className="text-2xl">{stats.users} ({stats.porcentagemUsers}%)</p>
          </div>
        </div>
      )}

      {/* tabela de usuários continua aqui */}
    </div>
  );
}

export default AdminDashboard;

import RolesChart from '../components/RolesChart';

function AdminDashboard() {
  // ... resto do código

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <LogoutButton />

      {/* cards de estatísticas */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold">Total Usuários</h2>
            <p className="text-2xl">{stats.totalUsuarios}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold">Admins</h2>
            <p className="text-2xl">{stats.admins} ({stats.porcentagemAdmins}%)</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold">Users</h2>
            <p className="text-2xl">{stats.users} ({stats.porcentagemUsers}%)</p>
          </div>
        </div>
      )}

      {/* gráfico de distribuição */}
      <div className="mb-6">
        <RolesChart />
      </div>

      {/* tabela de usuários */}
    </div>
  );
}
import RecentActivity from '../components/RecentActivity';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <LogoutButton />

      {/* cards de estatísticas */}
      <RolesChart />
      <LoginStatsChart />

      {/* atividade recente */}
      <RecentActivity />

      {/* tabela de usuários */}
    </div>
  );
}
import AuditLogs from '../components/AuditLogs';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <LogoutButton />

      <RolesChart />
      <LoginStatsChart />
      <RecentActivity />

      {/* logs de auditoria */}
      <AuditLogs />

      {/* tabela de usuários */}
    </div>
  );
}
import ExportButtons from '../components/ExportButtons';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <LogoutButton />

      <ExportButtons /> {/* botões de exportação */}

      <RolesChart />
      <LoginStatsChart />
      <RecentActivity />
      <AuditLogs />

      {/* tabela de usuários */}
    </div>
  );
}

import RealtimeNotifications from '../components/RealtimeNotifications';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <LogoutButton />

      <ExportButtons />
      <RolesChart />
      <LoginStatsChart />
      <RecentActivity />
      <AuditLogs />
      <RealtimeNotifications /> {/* notificações em tempo real */}

      {/* tabela de usuários */}
    </div>
  );
}
function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <a href="/admin" className="block hover:bg-blue-700 p-2 rounded">Dashboard</a>
          <a href="/relatorios" className="block hover:bg-blue-700 p-2 rounded">Relatórios</a>
          <a href="/usuarios" className="block hover:bg-blue-700 p-2 rounded">Usuários</a>
          <a href="/config" className="block hover:bg-blue-700 p-2 rounded">Configurações</a>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <LogoutButton />

        <ExportButtons />

        {/* Grid de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
            <span className="text-blue-600 text-4xl mr-4">👥</span>
            <div>
              <h2 className="text-lg font-bold">Total Usuários</h2>
              <p className="text-2xl">120</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
            <span className="text-green-600 text-4xl mr-4">🛡️</span>
            <div>
              <h2 className="text-lg font-bold">Admins</h2>
              <p className="text-2xl">15</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
            <span className="text-purple-600 text-4xl mr-4">👤</span>
            <div>
              <h2 className="text-lg font-bold">Users</h2>
              <p className="text-2xl">105</p>
            </div>
          </div>
        </div>

        {/* Gráficos e relatórios */}
        <RolesChart />
        <LoginStatsChart />
        <RecentActivity />
        <AuditLogs />
        <RealtimeNotifications />
      </main>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import LogoutButton from '../components/LogoutButton';
import ExportButtons from '../components/ExportButtons';
import RolesChart from '../components/RolesChart';
import LoginStatsChart from '../components/LoginStatsChart';
import RecentActivity from '../components/RecentActivity';
import AuditLogs from '../components/AuditLogs';
import RealtimeNotifications from '../components/RealtimeNotifications';

function AdminDashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState('');
  const [filtroRole, setFiltroRole] = useState('');

  useEffect(() => {
    api.get('/admin/usuarios').then(res => setUsuarios(res.data));
  }, []);

  const usuariosFiltrados = usuarios.filter(u => {
    const matchBusca =
      u.nome.toLowerCase().includes(busca.toLowerCase()) ||
      u.email.toLowerCase().includes(busca.toLowerCase());
    const matchRole = filtroRole ? u.role === filtroRole : true;
    return matchBusca && matchRole;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <a href="/admin" className="block hover:bg-blue-700 p-2 rounded">Dashboard</a>
          <a href="/relatorios" className="block hover:bg-blue-700 p-2 rounded">Relatórios</a>
          <a href="/usuarios" className="block hover:bg-blue-700 p-2 rounded">Usuários</a>
          <a href="/config" className="block hover:bg-blue-700 p-2 rounded">Configurações</a>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <LogoutButton />
        <ExportButtons />

        <RolesChart />
        <LoginStatsChart />
        <RecentActivity />
        <AuditLogs />
        <RealtimeNotifications />

        {/* Filtros e busca */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="border rounded p-2 flex-1"
          />
          <select
            value={filtroRole}
            onChange={e => setFiltroRole(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Todos</option>
            <option value="admin">Admins</option>
            <option value="user">Users</option>
          </select>
        </div>

        {/* Tabela de usuários filtrada */}
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">ID</th>
              <th className="p-2">Nome</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map(u => (
              <tr key={u.id} className="border-b">
                <td className="p-2">{u.id}</td>
                <td className="p-2">{u.nome}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2">
                  <button className="bg-red-600 text-white px-3 py-1 rounded">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import api from '../services/api';

function AdminDashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    api.get(`/admin/usuarios?page=${page}&limit=${limit}`).then(res => {
      setUsuarios(res.data.usuarios);
      setTotal(res.data.total);
    });
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* tabela de usuários */}
      <table className="w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Nome</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id} className="border-b">
              <td className="p-2">{u.id}</td>
              <td className="p-2">{u.nome}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* paginação */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>Página {page} de {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;

import FinanceDashboard from '../components/FinanceDashboard';

function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar + conteúdo */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <LogoutButton />
        <ExportButtons />

        <RolesChart />
        <LoginStatsChart />
        <RecentActivity />
        <AuditLogs />
        <RealtimeNotifications />
        <FinanceDashboard /> {/* novo módulo financeiro */}

        {/* tabela de usuários */}
      </main>
    </div>
  );
}


import React from 'react';
import Dashboard from '../components/Dashboard';

function Relatorios() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold p-6">Relatórios Financeiros</h1>
      <Dashboard />
    </div>
  );
}

export default Relatorios;

import React from 'react';
import Dashboard from '../components/Dashboard';
import ClientesChart from '../components/ClientesChart';

function Relatorios() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold p-6">Relatórios Financeiros</h1>
      <Dashboard />
      <ClientesChart />
    </div>
  );
}

export default Relatorios;

import React from 'react';
import Dashboard from '../components/Dashboard';
import ClientesChart from '../components/ClientesChart';
import RegioesChart from '../components/RegioesChart';

function Relatorios() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold p-6">Relatórios Financeiros</h1>
      <Dashboard />
      <ClientesChart />
      <RegioesChart />
    </div>
  );
}

export default Relatorios;

import React from 'react';
import Dashboard from '../components/Dashboard';
import ClientesChart from '../components/ClientesChart';
import RegioesChart from '../components/RegioesChart';
import ProdutosChart from '../components/ProdutosChart';

function Relatorios() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold p-6">Relatórios Financeiros</h1>
      <Dashboard />
      <ClientesChart />
      <RegioesChart />
      <ProdutosChart />
    </div>
  );
}

export default Relatorios;

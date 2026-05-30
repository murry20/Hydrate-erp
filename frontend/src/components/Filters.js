import React, { useState } from 'react';

function Filters({ onFilter }) {
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');

  const aplicarFiltro = () => {
    onFilter({ inicio, fim });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex gap-4">
      <div>
        <label className="block text-sm font-medium">Data Início</label>
        <input type="date" value={inicio} onChange={e => setInicio(e.target.value)} className="border rounded p-2"/>
      </div>
      <div>
        <label className="block text-sm font-medium">Data Fim</label>
        <input type="date" value={fim} onChange={e => setFim(e.target.value)} className="border rounded p-2"/>
      </div>
      <button onClick={aplicarFiltro} className="bg-blue-600 text-white px-4 py-2 rounded">
        Aplicar
      </button>
    </div>
  );
}

export default Filters;

import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Filters({ onFilter }) {
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [produtoId, setProdutoId] = useState('');

  useEffect(() => {
    api.get('/clientes').then(res => setClientes(res.data));
    api.get('/produtos').then(res => setProdutos(res.data));
  }, []);

  const aplicarFiltro = () => {
    onFilter({ inicio, fim, clienteId, produtoId });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium">Data Início</label>
        <input type="date" value={inicio} onChange={e => setInicio(e.target.value)} className="border rounded p-2 w-full"/>
      </div>
      <div>
        <label className="block text-sm font-medium">Data Fim</label>
        <input type="date" value={fim} onChange={e => setFim(e.target.value)} className="border rounded p-2 w-full"/>
      </div>
      <div>
        <label className="block text-sm font-medium">Cliente</label>
        <select value={clienteId} onChange={e => setClienteId(e.target.value)} className="border rounded p-2 w-full">
          <option value="">Todos</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Produto</label>
        <select value={produtoId} onChange={e => setProdutoId(e.target.value)} className="border rounded p-2 w-full">
          <option value="">Todos</option>
          {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>
      </div>
      <button onClick={aplicarFiltro} className="bg-blue-600 text-white px-4 py-2 rounded col-span-4">
        Aplicar
      </button>
    </div>
  );
}

export default Filters;

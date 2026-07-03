import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post('/auth/registrar', { nome, email, senha });
      alert('Usuário registrado com sucesso!');
      navigate('/login');
    } catch (error) {
      alert('Erro ao registrar usuário');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Registrar</h1>
        <input type="text" placeholder="Nome" value={nome}
          onChange={e => setNome(e.target.value)}
          className="border rounded p-2 w-full mb-4"/>
        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded p-2 w-full mb-4"/>
        <input type="password" placeholder="Senha" value={senha}
          onChange={e => setSenha(e.target.value)}
          className="border rounded p-2 w-full mb-4"/>
        <button onClick={handleRegister} className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Registrar
        </button>
      </div>
    </div>
  );
}

export default Register;

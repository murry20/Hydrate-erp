import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, senha });
      localStorage.setItem('token', res.data.token);
      alert('Login realizado com sucesso!');
      navigate('/relatorios'); // redireciona para dashboard
    } catch (error) {
      alert('Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded p-2 w-full mb-4"/>
        <input type="password" placeholder="Senha" value={senha}
          onChange={e => setSenha(e.target.value)}
          className="border rounded p-2 w-full mb-4"/>
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;

const handleLogin = async () => {
  try {
    const res = await api.post('/auth/login', { email, senha });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.role);
    alert('Login realizado com sucesso!');
    navigate('/relatorios');
  } catch (error) {
    alert('Erro ao fazer login');
  }
};

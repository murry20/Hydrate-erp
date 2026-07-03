import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert('Logout realizado com sucesso!');
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
      Logout
    </button>
  );
}

export default LogoutButton;

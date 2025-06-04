import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Obtener datos del usuario
    fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('No autorizado');
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Perfil de Usuario</h2>
        <div className="mb-4">
          <strong>Nombre:</strong> {user.name || 'No disponible'}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {user.email}
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 mt-6"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Perfil;
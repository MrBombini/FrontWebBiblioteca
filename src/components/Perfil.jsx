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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Avatar usuario"
          className="w-28 h-28 rounded-full shadow mb-6 border-4 border-blue-200 bg-blue-50"
        />
        <h2 className="text-3xl font-extrabold mb-4 text-blue-700 drop-shadow text-center">Perfil de Usuario</h2>
        <div className="mb-4 w-full">
          <span className="block text-gray-600 font-semibold mb-1">Nombre:</span>
          <span className="block text-lg text-blue-900">{user.name || 'No disponible'}</span>
        </div>
        <div className="mb-6 w-full">
          <span className="block text-gray-600 font-semibold mb-1">Email:</span>
          <span className="block text-lg text-blue-900">{user.email}</span>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-2 rounded-full font-bold shadow hover:from-red-600 hover:to-red-800 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Perfil;
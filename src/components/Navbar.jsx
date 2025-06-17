import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notifications from './Notifications';

const Navbar = () => {
  const [openLibros, setOpenLibros] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Verifica autenticación al montar
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('user'));
  }, []);

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenLibros(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Logout simple
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center shadow-lg bg-white rounded-lg">
      <div className="flex items-center gap-8">
        <h1
          className="text-2xl font-extrabold cursor-pointer tracking-wide hover:underline hover:text-indigo-600 transition "
          onClick={() => navigate('/')}
        >
          <span className="inline-block mr-2">📚</span>Biblioteca
        </h1>
        <div className="relative" ref={menuRef}>
          <button
            className="hover:bg-blue-100 px-4 py-2 rounded transition focus:outline-none font-semibold"
            onClick={() => setOpenLibros((prev) => !prev)}
          >
            Libros <span className="ml-1">▼</span>
          </button>
          {openLibros && (
            <div className="absolute left-0 mt-2 w-56 bg-white text-blue-900 rounded-xl shadow-xl z-20 border border-blue-100">
              <Link
                to="/books"
                className="block px-5 py-3 hover:bg-blue-100 rounded-t-xl transition"
                onClick={() => setOpenLibros(false)}
              >
                📖 Lista de Libros
              </Link>
              <Link
                to="/loans"
                className="block px-5 py-3 hover:bg-blue-100 transition"
                onClick={() => setOpenLibros(false)}
              >
                📋 Lista de Préstamos
              </Link>
              <Link
                to="/penalty"
                className="block px-5 py-3 hover:bg-blue-100 rounded-b-xl transition"
                onClick={() => setOpenLibros(false)}
              >
                🚫 Sanciones
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Notifications />
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="px-5 py-2 rounded-full bg-white font-semibold hover:bg-blue-100 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 rounded-full bg-white  font-semibold hover:bg-blue-100 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/perfil"
              className="px-5 py-2 rounded-full bg-white  font-semibold hover:bg-blue-100 transition"
            >
              Perfil
            </Link>
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

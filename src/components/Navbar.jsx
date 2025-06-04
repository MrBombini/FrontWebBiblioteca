import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Mi Biblioteca</h1>
      <div className="flex items-center gap-4">
        <div className="relative" ref={menuRef}>
          <button
            className="hover:underline px-4 py-2 rounded focus:outline-none"
            onClick={() => setOpenLibros((prev) => !prev)}
          >
            Libros
          </button>
          {openLibros && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
              <Link
                to="/books"
                className="block px-4 py-2 hover:bg-blue-100"
                onClick={() => setOpenLibros(false)}
              >
                Lista de Libros
              </Link>
              <Link
                to="/loans"
                className="block px-4 py-2 hover:bg-blue-100"
                onClick={() => setOpenLibros(false)}
              >
                Lista de Préstamos
              </Link>
            </div>
          )}
        </div>
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded bg-white text-blue-600 hover:bg-blue-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded bg-white text-blue-600 hover:bg-blue-100"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/perfil"
              className="px-4 py-2 rounded bg-white text-blue-600 hover:bg-blue-100"
            >
              Perfil
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
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

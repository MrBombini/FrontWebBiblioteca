import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Mi Biblioteca</h1>
      <div className="space-x-4">
        <Link to="/books" className="hover:underline">
          Libros
        </Link>
        <Link to="/register" className="hover:underline">
          Registrar Libro
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

const Books = () => {
  const API_URL = `${import.meta.env.VITE_API_URL_BOOK_SERVICE}/book`;
  const { data: libros, loading, error, refetch } = useFetch(API_URL);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  const openModal = (book) => {
    setSelectedBook(book);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedBook(null);
  };

  const handleLoan = (libroId) => {
    navigate(`/prestamo?libroId=${libroId}`);
  };

  const handleRequest = () => {
    navigate(`/solicitud`);
  };

  // Libro dummy solo frontend
  const dummyBook = {
    id: 'dummy-1',
    titulo: 'Libro de Prueba',
    autor: 'Autor Dummy',
    anio_publicacion: '2024',
    categoria: 'Ficción',
    estado: 'disponible',
    portada: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=cover&w=200&q=80', // imagen dummy
    dummy: true
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-blue-500 font-semibold">Cargando libros...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-semibold">
          ❌ Error al cargar los libros: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-10 drop-shadow">Lista de Libros</h2>

      {/* Libro dummy solo frontend */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        <li
          key={dummyBook.id}
          className="bg-yellow-50 border-l-8 border-yellow-400 shadow-xl rounded-2xl p-6 flex flex-col justify-between relative hover:scale-105 transition-transform cursor-pointer"
          onClick={() => openModal(dummyBook)}
        >
          <div>
            <img
              src={dummyBook.portada}
              alt="Portada del libro"
              className="w-28 h-40 object-cover rounded shadow mb-4 mx-auto"
            />
            <h3 className="text-2xl font-bold text-yellow-700 mb-2 flex items-center gap-2 justify-center">
              <span>📘</span> {dummyBook.titulo}
            </h3>
            <p className="text-gray-700 mb-1"><span className="font-semibold">Autor:</span> {dummyBook.autor}</p>
            <p className="text-gray-700 mb-1"><span className="font-semibold">Año:</span> {dummyBook.anio_publicacion}</p>
            <p className="text-gray-700 mb-1"><span className="font-semibold">Categoría:</span> {dummyBook.categoria}</p>
            <p className="text-gray-700 mb-3"><span className="font-semibold">Estado:</span> {dummyBook.estado}</p>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
              onClick={(e) => { e.stopPropagation(); handleLoan(dummyBook.id); }}
              disabled={dummyBook.estado === 'prestado'}
            >
              {dummyBook.estado === 'prestado' ? 'No Disponible' : 'Pedir Préstamo'}
            </button>
          </div>
          <span className="absolute top-2 right-4 text-xs text-yellow-700 italic">* Dummy solo frontend</span>
        </li>
      </ul>

      {/* Lista real de libros */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {libros && libros.map((libro) => (
          <li
            key={libro.id}
            className="bg-white shadow-xl rounded-2xl p-6 flex flex-col justify-between relative hover:scale-105 transition-transform cursor-pointer"
            onClick={() => openModal(libro)}
          >
            <div>
              <img
                src={libro.portada || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=cover&w=200&q=80'}
                alt="Portada del libro"
                className="w-28 h-40 object-cover rounded shadow mb-4 mx-auto"
              />
              <h3 className="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2 justify-center">
                <span>📖</span> {libro.titulo}
              </h3>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Autor:</span> {libro.autor}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Año:</span> {libro.anio_publicacion}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Categoría:</span> {libro.categoria}</p>
              <p className="text-gray-700 mb-3"><span className="font-semibold">Estado:</span> {libro.estado}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className={`bg-green-500 text-white px-4 py-2 rounded-lg shadow transition ${
                  libro.estado === 'prestado'
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-green-600'
                }`}
                onClick={(e) => { e.stopPropagation(); handleLoan(libro.id); }}
                disabled={libro.estado === 'prestado'}
              >
                {libro.estado === 'prestado' ? 'No Disponible' : 'Pedir Préstamo'}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de detalles del libro */}
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        {selectedBook && (
          <div className="flex flex-col items-center p-4">
            <img
              src={selectedBook.portada || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=cover&w=200&q=80'}
              alt="Portada del libro"
              className="w-40 h-60 object-cover rounded shadow mb-6"
            />
            <h3 className="text-3xl font-bold mb-2 text-blue-700">{selectedBook.titulo}</h3>
            <p className="mb-1"><span className="font-semibold">Autor:</span> {selectedBook.autor}</p>
            <p className="mb-1"><span className="font-semibold">Año:</span> {selectedBook.anio_publicacion}</p>
            <p className="mb-1"><span className="font-semibold">Categoría:</span> {selectedBook.categoria}</p>
            <p className="mb-3"><span className="font-semibold">Estado:</span> {selectedBook.estado}</p>
            <button
              className={`mt-4 bg-green-600 text-white px-6 py-2 rounded-full font-bold shadow hover:bg-green-700 transition ${
                selectedBook.estado === 'prestado' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => {
                if (!selectedBook.dummy) handleLoan(selectedBook.id);
                else handleRequest(selectedBook.id);
              }}
              disabled={selectedBook.estado === 'prestado'}
            >
              {selectedBook.estado === 'prestado' ? 'No Disponible' : 'Pedir Préstamo'}
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Books;

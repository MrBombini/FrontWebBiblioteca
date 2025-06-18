import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import Modal from './Modal';
import CreateRequest from './CreateRequest';
import { useNavigate } from 'react-router-dom';
import BooksTable from './BooksTable';

const Books = () => {
  const [page, setPage] = useState(1);
  const API_URL = `${import.meta.env.VITE_API_URL_BOOK_SERVICE}/book?page=${page}`;
  const { data: response, loading, error, refetch } = useFetch(API_URL);

  const libros = response?.data || [];
  const [librosAleatorios, setLibrosAleatorios] = useState([]);

  // Solo randomiza cuando cambia la lista de libros (ej: al cargar la página)
  useEffect(() => {
    if (libros.length > 0) {
      const getRandomBooks = (books, count = 3) => {
        if (books.length <= count) return books;
        const shuffled = [...books].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      };
      setLibrosAleatorios(getRandomBooks(libros, 3));
    }
  }, [libros]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const openModal = (book) => {
    setSelectedBook(book);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedBook(null);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetch();
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
    <div className="p-6 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-[#e8cd01] mb-10 drop-shadow">Lista de Libros</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {librosAleatorios.map((libro) => (
          <li
            key={libro.id}
            className="bg-white shadow-xl rounded-2xl p-6 flex flex-col justify-between relative hover:scale-105 transition-transform cursor-pointer"
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
                onClick={() => openModal(libro)}
                disabled={libro.estado === 'prestado'}
              >
                {libro.estado === 'prestado' ? 'No Disponible' : 'Solicitar Préstamo'}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <BooksTable />
      </div>

      {/* Modal para solicitar préstamo */}
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        {selectedBook && (
          <CreateRequest book={selectedBook} onClose={handleCloseModal} />
        )}
      </Modal>
    </div>
  );
};

export default Books;

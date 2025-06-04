import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import Modal from './Modal';
import EditBook from './EditBook';

const Books = () => {
  const API_URL = `${import.meta.env.VITE_API_URL}/book`;
  const { data: libros, loading, error, refetch } = useFetch(API_URL);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openModal = (libroId) => {
    setSelectedId(libroId);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedId(null);
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Lista de Libros</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {libros && libros.map((libro) => (
          <li
            key={libro.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800">{libro.titulo}</h3>
            <p className="text-gray-600">Autor: {libro.autor}</p>
            <p className="text-gray-600">Año: {libro.anio_publicacion}</p>
            <p className="text-gray-600">Categoría: {libro.categoria}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => openModal(libro.id)}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        {selectedId && (
          <EditBook
            libroId={selectedId}
            onBookUpdated={() => {
              refetch();
              handleCloseModal();
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default Books;

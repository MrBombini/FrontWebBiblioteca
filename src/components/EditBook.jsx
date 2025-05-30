import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import axios from 'axios';

const EditBook = ({ libroId, onClose, onBookUpdated }) => {
  const API_URL = `http://127.0.0.1:8000/api/book/${libroId}`;
  const { data: libro, loading, error, setData: setLibro } = useFetch(API_URL);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLibro((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(API_URL, libro);
      onBookUpdated(); // Notificar al componente padre que el libro fue actualizado
      onClose(); // Cerrar el modal o formulario
    } catch (error) {
      console.error('Error al actualizar el libro:', error);
    }
  };

  if (loading) return <p>Cargando datos del libro...</p>;
  if (error) return <p>Error al cargar los datos del libro.</p>;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h3 className="text-xl font-bold mb-4">Editar Libro</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="titulo"
              placeholder="Título"
              value={libro.titulo}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="autor"
              placeholder="Autor"
              value={libro.autor}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              name="anio_publicacion"
              placeholder="Año de publicación"
              value={libro.anio_publicacion}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="categoria"
              placeholder="Categoría"
              value={libro.categoria}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
            <select
              name="estado"
              value={libro.estado}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="Disponible">Disponible</option>
              <option value="No Disponible">No Disponible</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBook = ({ libroId, onBookUpdated }) => {
  const API_URL = `http://127.0.0.1:8000/api/book/${libroId}`;
  const { data, loading, error, execute } = useFetch(API_URL, 'GET');

  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    anio_publicacion: '',
    categoria: '',
  });

  useEffect(() => {
    if (data) {
      setFormData({
        titulo: data.titulo || '',
        autor: data.autor || '',
        anio_publicacion: data.anio_publicacion || '',
        categoria: data.categoria || '',
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await execute(formData, 'PUT');
      toast.success("Libro actualizado exitosamente.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => {
          if (onBookUpdated) onBookUpdated();
        }
      });
    } catch (err) {
      toast.error("❌ Error al actualizar el libro", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Editar Libro</h2>

        <div>
          <label className="block mb-1 text-gray-600">Título:</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Autor:</label>
          <input
            type="text"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Año de Publicación:</label>
          <input
            type="number"
            name="anio_publicacion"
            value={formData.anio_publicacion}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Categoría:</label>
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Guardar Cambios
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default EditBook;

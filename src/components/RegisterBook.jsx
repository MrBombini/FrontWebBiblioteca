import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const RegistrarLibro = () => {
  const [formulario, setFormulario] = useState({
    titulo: '',
    autor: '',
    anio_publicacion: '',
    categoria: '',
    estado: 'disponible',
  });

  const [errores, setErrores] = useState({});
  const API_URL = `${import.meta.env.VITE_API_URL}/book`;
  const { execute, loading } = useFetch(API_URL, 'POST', null, false);
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setErrores({});
    try {
      await execute(formulario, 'POST');
      toast.success("Libro registrado exitosamente.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => navigate('/books')
      });
      setFormulario({
        titulo: '',
        autor: '',
        anio_publicacion: '',
        categoria: '',
        estado: 'disponible',
      });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrores(error.response.data.errors);
      } else {
        toast.error("❌ Error al registrar el libro", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Registrar Nuevo Libro</h2>
      <form onSubmit={manejarEnvio} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Título:</label>
          <input
            type="text"
            name="titulo"
            value={formulario.titulo}
            onChange={manejarCambio}
            className="w-full p-2 border rounded"
          />
          {errores.titulo && <p className="text-red-500 text-sm">{errores.titulo[0]}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Autor:</label>
          <input
            type="text"
            name="autor"
            value={formulario.autor}
            onChange={manejarCambio}
            className="w-full p-2 border rounded"
          />
          {errores.autor && <p className="text-red-500 text-sm">{errores.autor[0]}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Año de Publicación:</label>
          <input
            type="number"
            name="anio_publicacion"
            value={formulario.anio_publicacion}
            onChange={manejarCambio}
            className="w-full p-2 border rounded"
          />
          {errores.anio_publicacion && (
            <p className="text-red-500 text-sm">{errores.anio_publicacion[0]}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Categoría:</label>
          <input
            type="text"
            name="categoria"
            value={formulario.categoria}
            onChange={manejarCambio}
            className="w-full p-2 border rounded"
          />
          {errores.categoria && <p className="text-red-500 text-sm">{errores.categoria[0]}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Estado:</label>
          <select
            name="estado"
            value={formulario.estado}
            onChange={manejarCambio}
            className="w-full p-2 border rounded"
          >
            <option value="disponible">Disponible</option>
            <option value="prestado">Prestado</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrar Libro'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegistrarLibro;

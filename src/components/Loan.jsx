import React from 'react';
import useFetch from '../hooks/useFetch';

const Loan = () => {
  const API_URL = `${import.meta.env.VITE_API_URL_LOAN_SERVICE}/prestamos`;
  const { data: response, loading, error } = useFetch(API_URL, 'GET');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-blue-500 font-semibold">Cargando préstamos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-semibold">
          ❌ Error al cargar los préstamos: {error.message}
        </p>
      </div>
    );
  }

  // Extraer el array `data` del JSON de respuesta
  const prestamos = response?.data || [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Lista de Préstamos</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prestamos.map((prestamo) => (
          <li
            key={prestamo.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800">Préstamo ID: {prestamo.id}</h3>
            <p className="text-gray-600">Usuario ID: {prestamo.user_id}</p>
            <p className="text-gray-600">Libro ID: {prestamo.libro_id}</p>
            <p className="text-gray-600">Fecha de Préstamo: {new Date(prestamo.fecha_prestamo).toLocaleDateString()}</p>
            <p className="text-gray-600">Fecha de Devolución Prevista: {new Date(prestamo.fecha_devolucion_prevista).toLocaleDateString()}</p>
            <p className="text-gray-600">Estado: {prestamo.estado}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Loan;
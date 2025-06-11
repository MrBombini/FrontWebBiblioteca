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
    <div className="p-6 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-10 drop-shadow">
        Lista de Préstamos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {prestamos.length === 0 ? (
          <div className="col-span-3 bg-white rounded-xl shadow p-8 text-center text-gray-500">
            <span className="text-4xl">📚</span>
            <p className="mt-2">No hay préstamos registrados.</p>
          </div>
        ) : (
          prestamos.map((prestamo) => (
            <div
              key={prestamo.id}
              className={`rounded-xl shadow-lg p-6 border-l-8 flex flex-col justify-between relative hover:scale-105 transition-transform ${
                prestamo.estado === 'pendiente'
                  ? 'border-yellow-500 bg-white'
                  : prestamo.estado === 'devuelto'
                  ? 'border-green-400 bg-green-50'
                  : 'border-blue-400 bg-blue-50'
              }`}
            >
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-3">
                  {prestamo.estado === 'pendiente'
                    ? '⏳'
                    : prestamo.estado === 'devuelto'
                    ? '✅'
                    : '📖'}
                </span>
                <span className="font-bold text-lg text-blue-700">
                  Préstamo #{prestamo.id}
                </span>
                <span
                  className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${
                    prestamo.estado === 'pendiente'
                      ? 'bg-yellow-100 text-yellow-700'
                      : prestamo.estado === 'devuelto'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {prestamo.estado.charAt(0).toUpperCase() +
                    prestamo.estado.slice(1)}
                </span>
              </div>
              <div className="text-gray-700 mb-1">
                <span className="font-semibold">Usuario ID:</span> {prestamo.user_id}
              </div>
              <div className="text-gray-700 mb-1">
                <span className="font-semibold">Libro ID:</span> {prestamo.libro_id}
              </div>
              <div className="flex flex-wrap gap-4 text-gray-700 mt-2">
                <div>
                  <span className="font-semibold">Fecha préstamo:</span>{' '}
                  {new Date(prestamo.fecha_prestamo).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-semibold">Devolución prevista:</span>{' '}
                  {new Date(prestamo.fecha_devolucion_prevista).toLocaleDateString()}
                </div>
                {prestamo.fecha_devolucion_real && (
                  <div>
                    <span className="font-semibold">Devolución real:</span>{' '}
                    {new Date(prestamo.fecha_devolucion_real).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Loan;
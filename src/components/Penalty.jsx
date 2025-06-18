import React from 'react';
import useFetch from '../hooks/useFetch';

const Penalty = () => {
  const API_URL = `${import.meta.env.VITE_API_URL_PENALTY_SERVICE}/sanciones`;
  const { data: response, loading, error } = useFetch(API_URL, 'GET');

  // Extraer el array `data` del JSON de respuesta
  const penalties = response?.data || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-blue-500 font-semibold">Cargando sanciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-semibold">
          ❌ Error al cargar las sanciones: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <h2 className="text-3xl font-bold mb-8 text-blue-800 drop-shadow">Sanciones del Lector</h2>
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {penalties.length === 0 ? (
          <div className="bg-white rounded shadow p-8 text-center text-gray-500">
            <span className="text-4xl">🎉</span>
            <p className="mt-2">No tienes sanciones. ¡Sigue así!</p>
          </div>
        ) : (
          penalties.map((penalty) => (
            <div
              key={penalty.id}
              className={`relative rounded-xl shadow-lg p-6 border-l-8 ${
                penalty.estado === 'Activa'
                  ? 'border-red-500 bg-white'
                  : 'border-green-400 bg-gray-50'
              }`}
            >
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-3">
                  {penalty.estado === 'Activa' ? '⚠️' : '✅'}
                </span>
                <span
                  className={`font-bold text-lg ${
                    penalty.estado === 'Activa' ? 'text-red-600' : 'text-green-700'
                  }`}
                >
                  {penalty.motivo}
                </span>
                <span
                  className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${
                    penalty.estado === 'Activa'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {penalty.estado}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-gray-700 mt-2">
                <div>
                  <span className="font-semibold">Fecha:</span> {penalty.fecha}
                </div>
                <div>
                  <span className="font-semibold">Días de sanción:</span> {penalty.dias}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Penalty;
import React, { useState } from 'react';

const Penalty = () => {
  // Sanciones dummy para mostrar
  const [penalties] = useState([
    {
      id: 1,
      motivo: 'Retraso en la devolución',
      fecha: '2025-06-01',
      estado: 'Activa',
      dias: 5,
    },
    {
      id: 2,
      motivo: 'Libro dañado',
      fecha: '2025-05-10',
      estado: 'Resuelta',
      dias: 0,
    },
    {
      id: 3,
      motivo: 'Libro dañado',
      fecha: '2025-05-10',
      estado: 'Resuelta',
      dias: 0,
    },
    {
      id: 4,
      motivo: 'Libro dañado',
      fecha: '2025-05-10',
      estado: 'Resuelta',
      dias: 0,
    },
    {
      id: 5,
      motivo: 'Libro dañado',
      fecha: '2025-05-10',
      estado: 'Resuelta',
      dias: 0,
    },
    {
      id: 6,
      motivo: 'Libro dañado',
      fecha: '2025-05-10',
      estado: 'Resuelta',
      dias: 0,
    },
  ]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-8">
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
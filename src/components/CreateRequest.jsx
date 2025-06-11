import React, { useState } from 'react';

const CreateRequest = () => {
  // Datos dummy
  const [userId] = useState(1);
  const [descripcion] = useState('Esta es una solicitud de prueba para el prestamo.');

  // Estado para mostrar el JSON generado
  const [jsonPreview, setJsonPreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Solo muestra el JSON dummy, no envía nada al backend
    setJsonPreview({
      user_id: userId,
      descripcion,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Solicitud de Préstamo (Dummy)</h2>
        <div className="mb-4">
          <label className="block mb-1">ID de Usuario</label>
          <input
            type="text"
            value={userId}
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Descripción</label>
          <textarea
            value={descripcion}
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-100"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Simular Solicitud
        </button>
        {jsonPreview && (
          <div className="mt-6 bg-gray-100 p-4 rounded text-sm">
            <strong>JSON Esperado:</strong>
            <pre className="mt-2">{JSON.stringify(jsonPreview, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateRequest;
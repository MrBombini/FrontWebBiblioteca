import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';

const CreateRequest = () => {
  const [formData, setFormData] = useState({
    usuario_id: '',
    descripcion: '',
    estado: 'pendiente',
    prestamo_id: '',
  });

  // Configura el hook para la ruta de solicitudes
  const { execute, loading, error } = useFetch(`${import.meta.env.VITE_API_URL_REQUEST_SERVICE}/solicitudes`, 'POST', null, false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await execute(formData); // Usa el hook para enviar la solicitud
      alert('Solicitud creada exitosamente');
    } catch (err) {
      console.error('Error al crear la solicitud:', err);
      alert('Hubo un error al crear la solicitud');
    }
  };

  return (
    <div>
      <h2>Crear Solicitud</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="usuario_id">ID de Usuario:</label>
          <input
            type="number"
            id="usuario_id"
            name="usuario_id"
            value={formData.usuario_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="estado">Estado:</label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
          >
            <option value="pendiente">Pendiente</option>
            <option value="aprobado">Aprobado</option>
            <option value="rechazado">Rechazado</option>
          </select>
        </div>
        <div>
          <label htmlFor="prestamo_id">ID de Préstamo (opcional):</label>
          <input
            type="number"
            id="prestamo_id"
            name="prestamo_id"
            value={formData.prestamo_id}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Solicitud'}
        </button>
        {error && <p className="text-red-500">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default CreateRequest;
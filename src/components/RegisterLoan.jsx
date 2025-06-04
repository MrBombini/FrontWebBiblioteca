import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const RegisterLoan = () => {
  const [libros, setLibros] = useState([]);
  const [libroId, setLibroId] = useState('');
  const [fechaDevolucionPrevista, setFechaDevolucionPrevista] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Obtener usuario autenticado
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Cargar libros disponibles
  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/book`);
        const data = await res.json();
        // Filtra solo los disponibles
        setLibros(data.filter(l => l.estado === 'disponible'));
      } catch {
        setError('Error al cargar libros');
      }
    };
    fetchLibros();
  }, []);

  // Leer libroId de la query si existe
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('libroId');
    if (id) setLibroId(id);
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!libroId || !fechaDevolucionPrevista) {
      setError('Completa todos los campos');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/prestamos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          libro_id: libroId,
          user_id: user.id,
          fecha_prestamo: new Date().toISOString(),
          fecha_devolucion_prevista: fechaDevolucionPrevista,
          estado: 'prestado',
        }),
      });

      if (res.ok) {
        alert('¡Préstamo registrado!');
        setLibroId('');
        setFechaDevolucionPrevista('');
      } else {
        const data = await res.json();
        setError(data.message || 'Error al registrar el préstamo');
      }
    } catch {
      setError('Error de conexión');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Pedir Prestado un Libro</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1">Libro</label>
          <select
            value={libroId}
            onChange={e => setLibroId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Selecciona un libro</option>
            {libros.map(libro => (
              <option key={libro.id} value={libro.id}>
                {libro.titulo} - {libro.autor}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-1">Fecha de devolución prevista</label>
          <input
            type="date"
            value={fechaDevolucionPrevista}
            onChange={e => setFechaDevolucionPrevista(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Solicitando...' : 'Pedir Préstamo'}
        </button>
      </form>
    </div>
  );
};

export default RegisterLoan;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '../hooks/useFetch';

const RegisterLoan = () => {
  const [libros, setLibros] = useState([]);
  const [libroId, setLibroId] = useState('');
  const [fechaDevolucionPrevista, setFechaDevolucionPrevista] = useState('');
  const [loading, setLoading] = useState(false);

  const userId = 1; // ID de usuario fijo
  const navigate = useNavigate();

  // Custom hook para actualizar el estado del libro
  const { execute: updateBookState } = useFetch(`${import.meta.env.VITE_API_URL_BOOK_SERVICE}/book/${libroId}`, 'PUT', null, false);

  // Cargar libros disponibles
  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL_BOOK_SERVICE}/book`);
        const data = await res.json();
        setLibros(data);
      } catch {
        toast.error('Error al cargar libros', {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };
    fetchLibros();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!libroId || !fechaDevolucionPrevista) {
      toast.error('Completa todos los campos', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      return;
    }

    const payload = {
      libro_id: parseInt(libroId, 10),
      user_id: userId,
      fecha_prestamo: new Date().toISOString().split('T')[0],
      fecha_devolucion_prevista: fechaDevolucionPrevista,
      estado: 'pendiente',
    };

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL_LOAN_SERVICE}/prestamos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Actualizar el estado del libro a "prestado" usando el custom hook
        const bookUpdateUrl = `${import.meta.env.VITE_API_URL_BOOK_SERVICE}/book/${libroId}`;
        await updateBookState({ estado: 'prestado' }, 'PUT', bookUpdateUrl);

        toast.success('¡Préstamo registrado exitosamente!', {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => navigate('/'),
        });
        setLibroId('');
        setFechaDevolucionPrevista('');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Error al registrar el préstamo', {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch {
      toast.error('Error de conexión', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registrar Préstamo</h2>
        <div className="mb-4">
          <label className="block mb-1">Libro</label>
          <select
            value={libroId}
            onChange={(e) => setLibroId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Selecciona un libro</option>
            {libros.map((libro) => (
              <option key={libro.id} value={libro.id} disabled={libro.estado === 'prestado'}>
                {libro.titulo} - {libro.autor} ({libro.estado})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-1">Fecha de devolución prevista</label>
          <input
            type="date"
            value={fechaDevolucionPrevista}
            onChange={(e) => setFechaDevolucionPrevista(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrar Préstamo'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterLoan;
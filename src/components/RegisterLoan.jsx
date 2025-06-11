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
  const [prestamos, setPrestamos] = useState([]);

  const userId = 1; // ID de usuario fijo
  const navigate = useNavigate();

  // Custom hook para actualizar el estado del libro
  const { execute: updateBookState } = useFetch(
    `${import.meta.env.VITE_API_URL_BOOK_SERVICE}/book/${libroId}`,
    'PUT',
    null,
    false
  );

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

  // Cargar préstamos del usuario (dummy visual)
  useEffect(() => {
    // Aquí deberías hacer fetch real, pero para demo:
    setPrestamos([
      {
        id: 101,
        libro: { titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez' },
        fecha_prestamo: '2025-06-01',
        fecha_devolucion_prevista: '2025-06-15',
        estado: 'pendiente',
      },
      {
        id: 102,
        libro: { titulo: '1984', autor: 'George Orwell' },
        fecha_prestamo: '2025-05-10',
        fecha_devolucion_prevista: '2025-05-24',
        estado: 'devuelto',
      },
    ]);
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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col items-center py-10">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg mb-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 drop-shadow">Solicitar Préstamo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-blue-700">Libro</label>
            <select
              value={libroId}
              onChange={(e) => setLibroId(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
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
            <label className="block mb-1 font-semibold text-blue-700">Fecha de devolución prevista</label>
            <input
              type="date"
              value={fechaDevolucionPrevista}
              onChange={(e) => setFechaDevolucionPrevista(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-full font-bold shadow hover:from-blue-700 hover:to-blue-800 transition"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar Solicitud'}
          </button>
        </form>
      </div>

      <div className="w-full max-w-3xl">
        <h3 className="text-2xl font-bold mb-4 text-blue-800 drop-shadow text-center">Tus Préstamos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prestamos.length === 0 ? (
            <div className="col-span-2 bg-white rounded-xl shadow p-8 text-center text-gray-500">
              <span className="text-4xl">📚</span>
              <p className="mt-2">No tienes préstamos registrados.</p>
            </div>
          ) : (
            prestamos.map((prestamo) => (
              <div
                key={prestamo.id}
                className={`rounded-xl shadow-lg p-6 border-l-8 flex flex-col justify-between ${
                  prestamo.estado === 'pendiente'
                    ? 'border-yellow-500 bg-white'
                    : 'border-green-400 bg-green-50'
                }`}
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">
                    {prestamo.estado === 'pendiente' ? '⏳' : '✅'}
                  </span>
                  <span className="font-bold text-lg text-blue-700">
                    {prestamo.libro.titulo}
                  </span>
                  <span
                    className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${
                      prestamo.estado === 'pendiente'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {prestamo.estado.charAt(0).toUpperCase() + prestamo.estado.slice(1)}
                  </span>
                </div>
                <div className="text-gray-700 mb-1">
                  <span className="font-semibold">Autor:</span> {prestamo.libro.autor}
                </div>
                <div className="flex flex-wrap gap-4 text-gray-700 mt-2">
                  <div>
                    <span className="font-semibold">Fecha préstamo:</span> {prestamo.fecha_prestamo}
                  </div>
                  <div>
                    <span className="font-semibold">Devolución prevista:</span> {prestamo.fecha_devolucion_prevista}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterLoan;
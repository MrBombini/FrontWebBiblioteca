import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CreateRequest = ({ book, onClose }) => {
  const API_URL_REQUEST = `${import.meta.env.VITE_API_URL_REQUEST_SERVICE}/solicitudes`;
  const API_URL_LOAN = `${import.meta.env.VITE_API_URL_LOAN_SERVICE}/prestamos`;
  const API_URL_BOOK = `${import.meta.env.VITE_API_URL_BOOK_SERVICE}/book/${book.id}`;

  const { execute: createRequest, loading: loadingRequest } = useFetch(
    API_URL_REQUEST,
    'POST',
    null,
    false
  );
  const { execute: createLoan, loading: loadingLoan } = useFetch(
    API_URL_LOAN,
    'POST',
    null,
    false
  );
  const { execute: updateBookState } = useFetch(API_URL_BOOK, 'PUT', null, false);

  const [formData, setFormData] = useState({
    descripcion: '',
    estado: 'pendiente',
    prestamo_id: '',
    book_id: book.id || '',
    fecha_devolucion_prevista: '',
  });

  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Obtener el ID del usuario logueado
  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No estás autenticado.', {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL_AUTH_SERVICE}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setUserId(data.id); // Asigna el ID del usuario logueado
        } else {
          toast.error('Error al obtener el usuario.', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        toast.error('Error de conexión.', {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };

    fetchUserId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error('No se puede enviar la solicitud sin un usuario logueado.', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Ajustamos el formato del payload según lo que espera el backend
    const loanPayload = {
      libro_id: parseInt(book.id),
      user_id: parseInt(userId),
      fecha_prestamo: new Date().toISOString().split('T')[0],
      fecha_devolucion_prevista: formData.fecha_devolucion_prevista,
      estado: 'pendiente',
    };

    const requestPayload = {
      usuario_id: parseInt(userId),
      descripcion: formData.descripcion || `Solicitud de préstamo para el libro ${book.titulo}`,
      estado: 'pendiente',
      book_id: parseInt(book.id)
    };

    try {
      // Crear préstamo
      const loanResponse = await createLoan(loanPayload, 'POST');
      
      if (loanResponse) {
        // Agregar el prestamo_id a la solicitud
        requestPayload.prestamo_id = loanResponse.id;
      }

      // Crear solicitud
      await createRequest(requestPayload, 'POST');

      // Actualizar estado del libro a "prestado"
      if (book.id) {
        await updateBookState({ estado: 'prestado' }, 'PUT');
      }

      toast.success('Préstamo y solicitud creados exitosamente.', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => {
          onClose();
        },
      });
    } catch (error) {
      console.error('Error detallado:', error);
      toast.error('❌ Error al crear el préstamo o la solicitud.', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Crear Solicitud y Préstamo
      </h2>

      {/* Mostrar detalles del libro */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-2 text-blue-700">
          Detalles del Libro
        </h3>
        <p>
          <strong>Título:</strong> {book.titulo}
        </p>
        <p>
          <strong>Autor:</strong> {book.autor}
        </p>
        <p>
          <strong>Año de Publicación:</strong> {book.anio_publicacion}
        </p>
        <p>
          <strong>Categoría:</strong> {book.categoria}
        </p>
        <p>
          <strong>Estado:</strong> {book.estado}
        </p>
      </div>

      <div>
        <label className="block mb-1">Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          rows={3}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Fecha de Devolución Prevista</label>
        <input
          type="date"
          name="fecha_devolucion_prevista"
          value={formData.fecha_devolucion_prevista}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loadingRequest || loadingLoan}
      >
        {loadingRequest || loadingLoan
          ? 'Procesando...'
          : 'Crear Solicitud y Préstamo'}
      </button>
      <ToastContainer />
    </form>
  );
};

export default CreateRequest;
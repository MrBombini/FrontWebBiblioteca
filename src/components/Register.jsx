import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation,
        }),
      });

      if (response.ok) {
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        window.location.href = '/login';
      } else {
        const data = await response.json();
        setError(data.message || 'Error al registrar usuario');
      }
    } catch (err) {
      setError('Error de conexión');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full">
        {/* Imagen lateral */}
        <div className="hidden md:flex items-center justify-center bg-blue-100 p-8 w-1/2">
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=cover&w=300&q=80"
            alt="Libros"
            className="rounded-xl shadow-lg object-cover h-64"
          />
        </div>
        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 p-8 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 drop-shadow">Crear Cuenta</h2>
          {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-green-700">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 border-2 border-green-200 rounded focus:outline-none focus:border-green-500 transition"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-green-700">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-green-200 rounded focus:outline-none focus:border-green-500 transition"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-green-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-green-200 rounded focus:outline-none focus:border-green-500 transition"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-semibold text-green-700">Confirmar Contraseña</label>
            <input
              type="password"
              value={password_confirmation}
              onChange={e => setPasswordConfirmation(e.target.value)}
              className="w-full px-4 py-2 border-2 border-green-200 rounded focus:outline-none focus:border-green-500 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 rounded-full font-bold shadow hover:from-green-700 hover:to-green-800 transition"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
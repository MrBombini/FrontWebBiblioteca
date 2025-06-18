import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Login: obtener token
      const response = await fetch(`${import.meta.env.VITE_API_URL_AUTH_SERVICE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);

        // 2. Obtener datos del usuario
        const meRes = await fetch(`${import.meta.env.VITE_API_URL_AUTH_SERVICE}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${data.access_token}`,
            'Content-Type': 'application/json',
          },
        });
        if (meRes.ok) {
          const user = await meRes.json();
          localStorage.setItem('user', JSON.stringify(user));
          window.location.href = '/';
        } else {
          setError('No se pudo obtener el perfil');
        }
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error de conexión');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-300">
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
          <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700 drop-shadow">Iniciar Sesión</h2>
          {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-blue-700">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-blue-200 rounded focus:outline-none focus:border-blue-500 transition"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-semibold text-blue-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-blue-200 rounded focus:outline-none focus:border-blue-500 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-full font-bold shadow hover:from-blue-700 hover:to-blue-800 transition"
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
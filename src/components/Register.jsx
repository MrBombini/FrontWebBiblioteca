import React, { useState, useEffect } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [gradientIndex, setGradientIndex] = useState(0);

  // Nuevo estado para controlar el modal de éxito
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Gradientes para el efecto de fondo animado
  const gradients = [
    'bg-gradient-to-br from-sky-100 to-blue-200',
    'bg-gradient-to-br from-cyan-100 to-azure-200',
    'bg-gradient-to-br from-cornflower-100 to-sky-300',
    'bg-gradient-to-br from-lavender-100 to-periwinkle-300',
    'bg-gradient-to-br from-powder-100 to-celeste-300',
  ];

  // Cambiar gradiente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientIndex((prev) => (prev + 1) % gradients.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_AUTH_SERVICE}/auth/register`, {
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
        // En lugar del alert, mostramos el modal de éxito
        setShowSuccessModal(true);
      } else {
        const data = await response.json();
        setError(data.message || 'Error al registrar usuario');
      }
    } catch (err) {
      setError('Error de conexión');
    }
    setLoading(false);
  };

  const handleRedirectToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <>
      <div className={`min-h-screen flex items-center justify-center transition-all duration-1000 ${gradients[gradientIndex]}`}>
        <div className="w-full max-w-md px-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-blue-100">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="mx-auto bg-gradient-to-br from-azure-300 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Crear Cuenta
                </h2>
                <p className="text-bluegray-500 mt-2">Regístrate para comenzar</p>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-rose-50 text-rose-600 rounded-lg border border-rose-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* --- Campos del formulario (sin cambios) --- */}
                <div className="mb-5">
                  <label className="block text-bluegray-700 mb-2 font-medium">Nombre completo</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition" placeholder="Tu nombre" required />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block text-bluegray-700 mb-2 font-medium">Correo electrónico</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition" placeholder="tu@email.com" required />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block text-bluegray-700 mb-2 font-medium">Contraseña</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition" placeholder="••••••••" required />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-bluegray-700 mb-2 font-medium">Confirmar contraseña</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
                    </div>
                    <input type="password" value={password_confirmation} onChange={e => setPasswordConfirmation(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition" placeholder="••••••••" required />
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded" required />
                  <label htmlFor="terms" className="ml-2 block text-sm text-bluegray-600">
                    Acepto los <a href="#" className="text-cyan-600 hover:text-cyan-700 font-medium">Términos y condiciones</a>
                  </label>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center" disabled={loading}>
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Registrando...
                    </>
                  ) : 'Registrarse'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-bluegray-500">
                <p>
                  ¿Ya tienes cuenta?{' '}
                  <a href="/login" className="text-cyan-600 hover:text-cyan-700 font-medium transition">
                    Inicia sesión
                  </a>
                </p>
              </div>
            </div>
            
            <div className="py-4 bg-blue-50 text-center border-t border-blue-100">
              <p className="text-bluegray-600">
                © {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- INICIO: Pop-up de Éxito --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 w-full max-w-sm text-center p-8">
            <div className="mx-auto bg-gradient-to-br from-green-400 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-bluegray-800 mb-2">¡Registro Exitoso!</h3>
            <p className="text-bluegray-500 mb-6">Tu cuenta ha sido creada. Ahora puedes iniciar sesión.</p>
            <button
              onClick={handleRedirectToLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Ir a Iniciar Sesión
            </button>
          </div>
        </div>
      )}
      {/* --- FIN: Pop-up de Éxito --- */}
    </>
  );
};

export default Register;
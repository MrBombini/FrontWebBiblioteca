import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';

const BooksTable = () => {
  const [page, setPage] = useState(1);
  const API_URL = `${import.meta.env.VITE_API_URL_BOOK_SERVICE}/book?page=${page}`;
  const { data: response, loading, error, refetch } = useFetch(API_URL);

  const libros = response?.data || [];
  const links = response?.links || [];

  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetch();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header con diseño más elegante */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-blue-700 mb-2">
            📚 Biblioteca Digital
          </h2>
          <p className="text-gray-600 text-lg">Explora nuestra colección de libros</p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>

        {loading ? (
          // Loader más atractivo
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-blue-600 mt-4 text-lg font-medium">Cargando libros...</p>
          </div>
        ) : error ? (
          // Error más elegante
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <div className="text-red-500 text-2xl mr-3">⚠️</div>
              <div>
                <h3 className="text-red-800 font-semibold text-lg">Error al cargar</h3>
                <p className="text-red-600 mt-1">No se pudieron obtener los libros en este momento</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Contenedor de la tabla con sombras y bordes redondeados */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Header de la tabla con color sólido */}
              <div className="bg-blue-700 px-6 py-4">
                <h3 className="text-white font-semibold text-lg flex items-center">
                  <span className="mr-2">📖</span>
                  Catálogo de Libros ({libros.length} {libros.length === 1 ? 'libro' : 'libros'})
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center">
                          <span className="mr-2">📝</span>
                          Título
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center">
                          <span className="mr-2">✍️</span>
                          Autor
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center">
                          <span className="mr-2">📅</span>
                          Año
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center">
                          <span className="mr-2">🏷️</span>
                          Categoría
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center">
                          <span className="mr-2">📊</span>
                          Estado
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center">
                          <span className="mr-2">🕐</span>
                          Creado
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center">
                          <span className="mr-2">🔄</span>
                          Actualizado
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {libros.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-16 text-center">
                          <div className="flex flex-col items-center">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-xl font-medium text-gray-500 mb-2">No hay libros disponibles</h3>
                            <p className="text-gray-400">La biblioteca está vacía en este momento</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      libros.map((libro, index) => (
                        <tr 
                          key={libro.id} 
                          className="hover:bg-blue-50 transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-md group"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-all duration-300">
                                <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                              </div>
                              <div>
                                <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                  {libro.titulo}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-700 font-medium group-hover:text-purple-600 transition-colors duration-300">
                              {libro.autor}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">
                              {libro.anio_publicacion}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 group-hover:bg-blue-100 group-hover:text-blue-700 transition-all duration-300">
                              {libro.categoria}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 transform group-hover:scale-105 ${
                              libro.estado === 'disponible' 
                                ? 'bg-green-100 text-green-700 group-hover:bg-green-200 group-hover:shadow-md' 
                                : 'bg-red-100 text-red-700 group-hover:bg-red-200 group-hover:shadow-md'
                            }`}>
                              <span className="mr-1">
                                {libro.estado === 'disponible' ? '✅' : '❌'}
                              </span>
                              {libro.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                            <div className="flex items-center">
                              <span className="mr-1">📅</span>
                              {new Date(libro.created_at).toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: '2-digit'
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-purple-600 transition-colors duration-300">
                            <div className="flex items-center">
                              <span className="mr-1">🔄</span>
                              {new Date(libro.updated_at).toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: '2-digit'
                              })}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Paginación mejorada */}
            {links.length > 0 && (
              <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex justify-center items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-600 mr-4 font-medium">Navegación:</span>
                  {links.map((link, idx) => {
                    if (!link.url) {
                      return (
                        <button
                          key={idx}
                          className="px-4 py-2 rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 transition-all duration-300"
                          disabled
                          dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                      );
                    }
                    return (
                      <button
                        key={idx}
                        className={`px-4 py-2 rounded-xl border-2 font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                          link.active 
                            ? 'bg-blue-600 text-white border-transparent shadow-lg scale-105' 
                            : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                        onClick={() => {
                          const match = link.url.match(/page=(\d+)/);
                          if (match) handlePageChange(Number(match[1]));
                        }}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    );
                  })}
                </div>
                <div className="text-center mt-4">
                  <span className="text-xs text-gray-500">Página {page}</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BooksTable;

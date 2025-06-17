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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Tabla de Libros</h2>
      {loading ? (
        <div className="text-center text-blue-600">Cargando...</div>
      ) : error ? (
        <div className="text-center text-red-600">Error al cargar los libros</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">ID</th>
                  <th className="px-4 py-2 border-b">Título</th>
                  <th className="px-4 py-2 border-b">Autor</th>
                  <th className="px-4 py-2 border-b">Año</th>
                  <th className="px-4 py-2 border-b">Categoría</th>
                  <th className="px-4 py-2 border-b">Estado</th>
                  <th className="px-4 py-2 border-b">Creado</th>
                  <th className="px-4 py-2 border-b">Actualizado</th>
                </tr>
              </thead>
              <tbody>
                {libros.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-gray-500">
                      No hay libros para mostrar.
                    </td>
                  </tr>
                ) : (
                  libros.map((libro) => (
                    <tr key={libro.id} className="hover:bg-blue-50 transition">
                      <td className="px-4 py-2 border-b">{libro.id}</td>
                      <td className="px-4 py-2 border-b">{libro.titulo}</td>
                      <td className="px-4 py-2 border-b">{libro.autor}</td>
                      <td className="px-4 py-2 border-b">{libro.anio_publicacion}</td>
                      <td className="px-4 py-2 border-b">{libro.categoria}</td>
                      <td className="px-4 py-2 border-b">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${libro.estado === 'disponible' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {libro.estado}
                        </span>
                      </td>
                      <td className="px-4 py-2 border-b">{new Date(libro.created_at).toLocaleString()}</td>
                      <td className="px-4 py-2 border-b">{new Date(libro.updated_at).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Paginación */}
          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            {links.map((link, idx) => {
              if (!link.url) {
                return (
                  <button
                    key={idx}
                    className="px-3 py-1 rounded bg-gray-200 text-gray-400 cursor-not-allowed"
                    disabled
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                );
              }
              return (
                <button
                  key={idx}
                  className={`px-3 py-1 rounded ${link.active ? 'bg-blue-600 text-white font-bold' : 'bg-gray-100 text-blue-700 hover:bg-blue-200'}`}
                  onClick={() => {
                    const match = link.url.match(/page=(\d+)/);
                    if (match) handlePageChange(Number(match[1]));
                  }}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default BooksTable;
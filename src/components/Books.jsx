import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LibroList = () => {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cambia esta URL por la de tu API
  const API_URL = 'http://127.0.0.1:8000/book';

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setLibros(response.data);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error al cargar los libros:', error);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando libros...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Libros</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Título</th>
            <th className="p-2 border">Autor</th>
            <th className="p-2 border">Año</th>
            <th className="p-2 border">Categoría</th>
            <th className="p-2 border">Estado</th>
          </tr>
        </thead>
        <tbody>
          {libros.map(libro => (
            <tr key={libro.id}>
              <td className="p-2 border">{libro.titulo}</td>
              <td className="p-2 border">{libro.autor}</td>
              <td className="p-2 border">{libro.anio_publicacion}</td>
              <td className="p-2 border">{libro.categoria}</td>
              <td className="p-2 border">{libro.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LibroList;

import React, { useState } from 'react';
import LibroList from './components/Books';
import RegistrarLibro from './components/RegisterBook';
import EditBook from './components/EditBook';

function App() {
  const [libroIdParaEditar, setLibroIdParaEditar] = useState(null);

  const handleEditarLibro = (id) => {
    setLibroIdParaEditar(id);
  };

  const handleCerrarEdicion = () => {
    setLibroIdParaEditar(null);
  };

  return (
    <div className="container mx-auto mt-5">
      <LibroList onEdit={handleEditarLibro} />
      <RegistrarLibro />
      {libroIdParaEditar && (
        <EditBook
          libroId={libroIdParaEditar}
          onClose={handleCerrarEdicion}
          onBookUpdated={() => {
            // Recargar la lista de libros aquí
          }}
        />
      )}
    </div>
  );
}

export default App;

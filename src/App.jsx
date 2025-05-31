import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LibroList from './components/Books';
import RegistrarLibro from './components/RegisterBook';
import EditBook from './components/EditBook';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
function App() {
  // Si necesitas editar libros con modal, puedes mantener este estado:
  const [libroIdParaEditar, setLibroIdParaEditar] = useState(null);

  const handleEditarLibro = (id) => {
    setLibroIdParaEditar(id);
  };

  const handleCerrarEdicion = () => {
    setLibroIdParaEditar(null);
  };

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<LibroList onEdit={handleEditarLibro} />} />
          <Route path="/register" element={<RegistrarLibro />} />
          {/* Si tienes una ruta para editar, puedes agregarla así: */}
          {/* <Route path="/edit/:id" element={<EditBook />} /> */}
        </Routes>
        {/* Si usas modal para editar libros */}
        {/* {libroIdParaEditar && (
          <Modal isOpen={!!libroIdParaEditar} onClose={handleCerrarEdicion}>
            <EditBook libroId={libroIdParaEditar} onBookUpdated={handleCerrarEdicion} />
          </Modal>
        )} */}
      </div>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LibroList from './components/Books';
import RegistrarLibro from './components/RegisterBook';
import EditBook from './components/EditBook';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import Login from './components/Login';
import Register from './components/Register';
import Perfil from './components/Perfil';
import RegisterLoan from './components/RegisterLoan';
import Loan from './components/Loan'; // Importa el componente Loan

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
    <BrowserRouter basename='/'>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<LibroList onEdit={handleEditarLibro} />} />
          <Route path="/registerbook" element={<RegistrarLibro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/prestamo" element={<RegisterLoan />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loans" element={<Loan />} /> {/* Nueva ruta para préstamos */}
          {/* Si tienes una ruta para editar, puedes agregarla así: */}
          {/* <Route path="/edit/:id" element={<EditBook />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

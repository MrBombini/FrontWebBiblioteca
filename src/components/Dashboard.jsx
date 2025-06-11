import React, { useState } from 'react';
import Books from './Books';

const Dashboard = () => {
    const [search, setSearch] = useState('');
    const categorias = [
        'Ficción',
        'No Ficción',
        'Ciencia',
        'Historia',
        'Infantil',
        'Aventura',
        'Fantasía',
        'Romance'
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-800 drop-shadow">Bienvenido a la Biblioteca</h1>
                <div className="flex justify-center mb-8">
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="🔎 Buscar libros o autores..."
                        className="w-full max-w-md px-5 py-3 border-2 border-blue-300 rounded-full shadow focus:outline-none focus:border-blue-500 transition"
                    />
                </div>
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {categorias.map((cat) => (
                        <button
                            key={cat}
                            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full shadow hover:from-blue-600 hover:to-blue-800 transition font-semibold tracking-wide"
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <Books search={search} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
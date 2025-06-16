import React, { useState } from 'react';
import Books from './Books';
import { div } from 'framer-motion/client';

const Dashboard = () => {
    const [search, setSearch] = useState('');
    const [showScroll, setShowScroll] = useState(false);
    const [mainGroup, setMainGroup] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");


    // Mostrar botón al hacer scroll
    React.useEffect(() => {
        const handleScroll = () => {
            setShowScroll(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Define los grupos:
    const grupos = [
        { value: "informativo", label: "Informativos / Científicos" },
        { value: "entretenimiento", label: "Entretenimiento" }
    ];

    // Relaciona categorías con grupos:
    const categorias = [
        { id: 1, name: 'Ficción', group: 'entretenimiento', description: 'Narraciones inventadas que pueden incluir elementos fantásticos o realistas.' },
        { id: 2, name: 'No Ficción', group: 'informativo', description: 'Obras basadas en hechos reales, como biografías o ensayos.' },
        { id: 3, name: 'Ciencia', group: 'informativo', description: 'Libros que exploran temas científicos, desde física hasta biología.' },
        { id: 4, name: 'Historia', group: 'informativo', description: 'Obras que relatan eventos pasados, biografías de personajes históricos o análisis de épocas.' },
        { id: 5, name: 'Infantil', group: 'entretenimiento', description: 'Libros diseñados para niños, con ilustraciones y narrativas simples.' },
        { id: 6, name: 'Aventura', group: 'entretenimiento', description: 'Narraciones que incluyen viajes, exploraciones y situaciones emocionantes.' },
        { id: 7, name: 'Fantasía', group: 'entretenimiento', description: 'Obras que incluyen elementos mágicos, mundos imaginarios y criaturas fantásticas.' },
        { id: 8, name: 'Romance', group: 'entretenimiento', description: 'Historias centradas en relaciones amorosas y emociones humanas.' },
        { id: 9, name: 'Tecnología', group: 'informativo', description: 'Libros que abordan temas tecnológicos, desde programación hasta innovaciones.' },
        { id: 10, name: 'Autoayuda', group: 'informativo', description: 'Obras diseñadas para ayudar a las personas a mejorar aspectos de su vida personal o profesional.' }
    ];

    // Filtra las categorías según el grupo seleccionado:
    const categoriasFiltradas = mainGroup
        ? categorias.filter(cat => cat.group === mainGroup)
        : [];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b">
            <main className='container mx-auto px-4 py-8'>
                <section id="home" className="rounded-2xl p-8 mb-12 shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-100">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl font-extrabold mb-4 leading-tight hero-title-light text-indigo-600 drop-shadow">
                            Bienvenido a la Biblioteca
                        </h1>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="🔎 Buscar libros o autores..."
                                className="w-full max-w-md px-5 py-3 border-2 border-purple-400 rounded-full shadow focus:outline-none focus:border-purple-600 transition"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row items-start gap-6 p-5">
                            <div className="flex flex-col gap-2">
                                {/* Combo de grupo */}
                                <select
                                    name="mainGroup"
                                    id="mainGroup"
                                    className="w-150 max-w-md px-5 py-3 border-2 border-orange-400 rounded-full shadow focus:outline-none focus:border-orange-600 transition"
                                    value={mainGroup}
                                    onChange={e => {
                                        setMainGroup(e.target.value);
                                        setSelectedCategory(""); // Reinicia la categoría al cambiar grupo
                                    }}
                                >
                                    <option value="" disabled hidden>Selecciona tipo de libros</option>
                                    {grupos.map(g => (
                                        <option key={g.value} value={g.value}>{g.label}</option>
                                    ))}
                                </select>
                                {/* Combo de categorías filtradas */}
                                <select
                                    name="categories"
                                    id="categories"
                                    className="w-150 max-w-md px-5 py-3 border-2 border-purple-400 rounded-full shadow focus:outline-none focus:border-purple-600 transition"
                                    value={selectedCategory}
                                    onChange={e => setSelectedCategory(e.target.value)}
                                    disabled={!mainGroup}
                                >
                                    <option value="" disabled hidden>Selecciona una categoría</option>
                                    {categoriasFiltradas.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {/* Casillas de verificación debajo del combo */}
                                <div className="flex items-center gap-4 mt-2">
                                    <label className="flex items-center gap-1">
                                        <input type="checkbox" />
                                        Libros prestados
                                    </label>
                                </div>
                            </div>
                            {selectedCategory && (
                                <div className="text-left text-gray-700 w-72 min-h-[80px] px-6 py-2 rounded-2xl shadow transition font-semibold tracking-wide bg-indigo-50 flex flex-col justify-center">
                                    <h2 className="text-xl font-semibold">
                                        {categorias.find(cat => String(cat.id) === selectedCategory)?.name}
                                    </h2>
                                    <p className='text-sm mt-2'>
                                        {categorias.find(cat => String(cat.id) === selectedCategory)?.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <div className="max-w mx-auto flex-1">


                    <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-600 drop-shadow">Libros Populares</h1>

                    {/* <div className="flex flex-wrap justify-center gap-4 mb-10">
                        {categorias.map((cat) => (
                            <button
                                key={cat}
                                className="bg-gradient-to-r  px-6 py-2 rounded-full shadow transition font-semibold tracking-wide"
                            >
                                {cat}
                            </button>
                        ))}
                    </div> */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <Books search={search} />
                    </div>
                </div>
                {/* Botón para subir arriba */}
                {showScroll !== null && (
                    <button
                        onClick={scrollToTop}
                        className={`fixed bottom-24 right-8 bg-blue-600 hover:bg-blue-800 text-white rounded-full p-3 shadow-lg z-50 transition
                        ${showScroll ? 'animate-fade-in' : 'animate-fade-out'}`}
                        aria-label="Subir arriba"
                        style={{
                            transition: 'opacity 0.4s, transform 0.4s',
                            opacity: showScroll ? 1 : 0,
                            transform: showScroll ? 'translateY(0)' : 'translateY(40px)'
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                )}
            </main>
            {/* <footer class="py-8 transition-colors duration-300 bg-gray-200 text-gray-700">
                <div class="container mx-auto px-4 text-center">
                    <div class="flex justify-center space-x-6 mb-4">
                        <a href="#" class="hover:scale-110 transition-transform duration-200 text-gray-600 hover:text-indigo-600" aria-label="GitHub">
                
                            <svg fill="currentColor" viewBox="0 0 24 24" class="h-7 w-7"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.498.09.668-.215.668-.477 0-.237-.014-1.033-.014-2.022-2.782.6-3.369-1.345-3.369-1.345-.454-1.158-1.11-1.464-1.11-1.464-.908-.618.069-.606.069-.606 1.003.07 1.531 1.032 1.531 1.032.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.93 0-1.088.39-1.979 1.029-2.679-.103-.252-.446-1.266.098-2.673 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.408.202 2.42.099 2.673.64.7 1.028 1.591 1.028 2.679 0 3.827-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.334-.014 2.41-.014 2.727 0 .263.167.572.676.475C21.137 20.19 24 16.425 24 12.017 24 6.484 19.522 2 14 2Z" clip-rule="evenodd" /></svg>
                        </a>
                        <a href="#" class="hover:scale-110 transition-transform duration-200 text-gray-600 hover:text-indigo-600" aria-label="Twitter">
             
                            <svg fill="currentColor" viewBox="0 0 24 24" class="h-7 w-7"><path d="M22.162 5.65C21.403 5.986 20.607 6.216 19.782 6.311 20.655 5.8 21.328 5.011 21.644 4.053 20.825 4.544 19.92 4.887 18.966 5.07C18.17 4.238 17.07 3.73 15.895 3.73c-2.316 0-4.19 1.874-4.19 4.19 0 .328.037.646.108.95C7.382 8.683 4.135 7 1.954 4.239c-.358.614-.564 1.328-.564 2.098 0 1.45.738 2.73 1.862 3.483-.683-.022-1.325-.21-1.89-.523v.053c0 2.03 1.442 3.722 3.354 4.103-.35.097-.72.15-1.102.15-.27 0-.533-.027-.79-.074.53 1.66 2.072 2.872 3.89 2.906-1.43 1.12-3.23 1.79-5.185 1.79-.337 0-.668-.02-.99-.058C3.898 19.14 6.082 20 8.447 20c7.042 0 10.887-5.82 10.887-10.887 0-.166-.004-.33-.012-.493.75-.542 1.4-1.217 1.91-1.984Z" clip-rule="evenodd" /></svg>
                        </a>
                        <a href="#" class="hover:scale-110 transition-transform duration-200 text-gray-600 hover:text-indigo-600" aria-label="LinkedIn">
                    
                            <svg fill="currentColor" viewBox="0 0 24 24" class="h-7 w-7"><path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" /></svg>
                        </a>
                    </div>
                    <p class="text-sm">
                        &copy; <span id="current-year"></span> Code/Share. All rights reserved.
                    </p>
                </div>
            </footer> */}
            <footer className="mt-12 text-center opacity-90 text-sm bg-gray-400 py-6 shadow-inner">
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <span className="flex items-center gap-2 font-semibold">
                        <span className="text-2xl">📚</span> Proyecto Biblioteca - 2025
                    </span>
                    <span className="hidden md:inline">|</span>
                    <span>
                        Desarrollado por <a href="/" className="underline hover:text-blue-700">Nombre</a>
                    </span>
                    <span className="hidden md:inline">|</span>
                    <span>
                        Contacto: <a href="/" className="underline hover:text-blue-700">biblioteca@gmail.com</a>
                    </span>
                </div>
            </footer>

        </div>
    );
};

export default Dashboard;
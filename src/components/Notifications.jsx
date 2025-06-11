import React, { useState, useRef, useEffect } from 'react';

const Notifications = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Notificaciones dummy
  const notifications = [
    {
      id: 1,
      title: 'Préstamo pendiente',
      message: 'Tienes un libro pendiente de devolver.',
      date: '2025-06-10',
    },
  ];

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="relative p-2 rounded-full hover:bg-blue-500 focus:outline-none"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Notificaciones"
      >
        {/* Icono de campana (Heroicons) */}
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {/* Punto rojo si hay notificaciones */}
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded shadow-lg z-20">
          <div className="p-4 border-b font-bold text-blue-600">Notificaciones</div>
          {notifications.length === 0 ? (
            <div className="p-4 text-gray-500">No tienes notificaciones.</div>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="p-4 border-b last:border-b-0">
                <div className="font-semibold">{n.title}</div>
                <div className="text-sm text-gray-700">{n.message}</div>
                <div className="text-xs text-gray-400 mt-1">{n.date}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
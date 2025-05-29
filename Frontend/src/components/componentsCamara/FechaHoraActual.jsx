import React, { useState, useEffect } from 'react';

const FechaHoraActual = ({ onFechaHoraChange }) => {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  useEffect(() => {
    // Función para obtener la fecha y hora actuales
    const obtenerFechaHora = () => {
      const now = new Date();
      const fechaActual = now.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      const horaActual = now.toTimeString().split(' ')[0]; // Formato HH:MM:SS

      setFecha(fechaActual);
      setHora(horaActual);

      // Llama a la función onFechaHoraChange para enviar los datos al componente padre
      onFechaHoraChange(fechaActual, horaActual);
    };

    obtenerFechaHora();

    // Actualiza la hora cada segundo si es necesario
    const timer = setInterval(obtenerFechaHora, 1000);
    return () => clearInterval(timer);
  }, [onFechaHoraChange]);

  return (
    <div>
      <p>Fecha: {fecha}</p>
      <p>Hora: {hora}</p>
    </div>
  );
};

export default FechaHoraActual;
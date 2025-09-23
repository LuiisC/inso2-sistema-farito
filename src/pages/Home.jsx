import React, { useEffect, useState } from "react";

function Home() {
  const [notificaciones, setNotificaciones] = useState([]);
  const nombre = "tecnico2";

  useEffect(() => {
    // Obtener notificaciones desde localStorage al cargar la página
    const data = localStorage.getItem("notificacionesFalla");
    if (data) {
      setNotificaciones(JSON.parse(data));
    }
  }, []);

  // Elimina una notificación específica
  const eliminarNotificacion = (index) => {
    const nuevas = [...notificaciones];
    nuevas.splice(index, 1); 
    setNotificaciones(nuevas);
    localStorage.setItem("notificacionesFalla", JSON.stringify(nuevas));
  };
  //convierte la fecha de aaaa/mm/dd --> dd/mm/aaaa para que se muestre en la pantalla principal 
  const formatearFecha = (fechaString) => {
  if (!fechaString) return '';
  const [year, month, day] = fechaString.split('-');
  return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <h2 className="text-center text-white mt-4">👋 ¡Hola, {nombre}!</h2>
      <h2 className="text-center text-white mt-4">Bienvenido al Sistema de Gestión para el Control de Equipos Informáticos "Farito"</h2>
      
      <h2 className="text-start text-white mt-4">NOTIFICACIONES</h2>
      
      {/*Notificaciones de falla*/}
      {notificaciones.length > 0 && (
        <div className="container mt-4">
          {notificaciones.map((noti, index) => (
            <div
              key={index}
              className="alert alert-info alert-dismissible fade show shadow d-inline-block mx-3 mt-3 p-2"
              role="alert"
            >
              <strong>{noti.tipo}</strong><br />
              Código: {noti.codigo}<br />
              Tipo de evento: {noti.evento}<br />
              Estado: {noti.estado}<br />
              Fecha: {formatearFecha(noti.fecha)}
              <button
                type="button"
                className="btn-close"
                onClick={() => eliminarNotificacion(index)}
              ></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;


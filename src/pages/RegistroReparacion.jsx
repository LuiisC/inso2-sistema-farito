import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Fallas from "./Fallas";
import Reparaciones from "./Reparaciones";
import RegistrarNuevo from "./RegistrarNuevo";
import TablaRegistrados from "./TablaRegistrados";
import BackButtonHome from "./BackButtonHome";
import SearchButton from "./SearchButton";


const RegistroReparacion = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  //const [notificaciones, setNotificaciones] = useState([]);
  const navigate = useNavigate();

  const [notificaciones, setNotificaciones] = useState(
    JSON.parse(localStorage.getItem("notificacionesFalla")) || []
  );
  //formatea la fecha para mostrarlo 
  const formatearFecha = (fechaString) => {
  if (!fechaString) return '';
  const [year, month, day] = fechaString.split('-');
  return `${day}/${month}/${year}`;
  };

  // Cargar la notificacion desde localStorage
  useEffect(() => {
  const actualizarNotificaciones = () => {
    const data = JSON.parse(localStorage.getItem("notificacionesFalla")) || [];
    setNotificaciones(data);
  };

  window.addEventListener("storage", actualizarNotificaciones);
  window.addEventListener("notificacionesActualizadas", actualizarNotificaciones);

  return () => {
    window.removeEventListener("storage", actualizarNotificaciones);
    window.removeEventListener("notificacionesActualizadas", actualizarNotificaciones);
  };
  }, []);



  // Eliminar una notificación específica
  const eliminarNotificacion = (index) => {
    const nuevas = [...notificaciones];
    nuevas.splice(index, 1);
    setNotificaciones(nuevas);
    localStorage.setItem("notificacionesFalla", JSON.stringify(nuevas));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (error) setError("");
  };

  const handleRowClick = (name) => {
    setInputValue(name);
    setError("");
  };

  const goHistorial = () => {
    const code = inputValue.trim();
    if (!code) {
      alert("Debe introducir un código de equipo");
      return;
    }
    // navegamos pasando el código en query string
    navigate(`/registro/historial?codigo=${encodeURIComponent(code)}`);
  };

  return (
    <div>
      <BackButtonHome />

      <div className="row justify-content-center p-3">
        <div className="col-auto">
          <button className="btn btn-light" onClick={() => setShowModal(true)}>
            Registrar Nuevo
          </button>
        </div>
        <div className="col-auto">
          <button
            className="btn btn-light"
            data-bs-toggle="modal"
            data-bs-target="#modalFalla"
          >
            Registrar Falla
          </button>
        </div>
        <div className="col-auto">
          <button
            className="btn btn-light"
            data-bs-toggle="modal"
            data-bs-target="#modalReparacion"
          >
            Registrar Reparación
          </button>
        </div>
      </div>

      {/* Búsqueda */}
      <div className="d-flex align-items-center gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          className="form-control w-25"
          onChange={handleInputChange}
          placeholder="Ingrese código del equipo..."
        />
        {/* Botón con ícono que usa el mismo handler */}
        <SearchButton code={inputValue} onSearch={goHistorial} />
        <button className="btn btn-info" onClick={goHistorial}>
          Ver historial
        </button>
        <button className="btn btn-danger" disabled>
          Eliminar
        </button>
      </div>

      <div className="row">
        {/*<TablaRegistrados onRowClick={handleRowClick} />*/}
      </div>
      <div className="mt-4">
        <h2 className="text-start text-white mt-4">NOTIFICACIONES</h2>
        {notificaciones.length === 0 && <p>No hay notificaciones.</p>}
        <div className="container mt-3">
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
      </div>

      <RegistrarNuevo
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
      <Fallas />
      <Reparaciones />
    </div>
  );
};

export default RegistroReparacion;

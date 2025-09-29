import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
  const navigate = useNavigate();

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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SolicitudesForm from "./SolicitudesForm";
import BackButtonHome from "./BackButtonHome";
import SearchButton from "./SearchButton";
import TablaSolicitudes from "./TablaSolicitudes";

const SolicitudTecnico = () => {
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

  const goSolicitudes = () => {
    const code = inputValue.trim();
    if (!code) {
      alert("Debe introducir un código de equipo");
      return;
    }
    navigate(`/registro/historial?codigo=${encodeURIComponent(code)}`);
  };

  return (
    <div>
      <BackButtonHome />

      <div className="row justify-content-center p-3">
        <div className="d-flex align-items-center gap-2 mb-4">
          <input
            type="text"
            value={inputValue}
            className="form-control w-25"
            onChange={handleInputChange}
            placeholder="Buscar solicitudes..."
          />

          <SearchButton code={inputValue} />

          <button className="btn btn-light" onClick={() => setShowModal(true)}>
            Crear Solicitud
          </button>
        </div>
      </div>

      <div className="row">
        <TablaSolicitudes onRowClick={handleRowClick} searchQuery={inputValue}/>
      </div>

      {/* Modal controlado por React */}
      <SolicitudesForm
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default SolicitudTecnico;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SolicitudesForm from "./SolicitudesForm";
import BackButtonHome from "./BackButtonHome";
import RegistrarNuevo from "./RegistrarNuevo";
import SearchButton from "./SearchButton";


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

            <div className="d-flex align-items-center gap-2 mb-4">
            <input
            type="text"
            value={inputValue}
            className="form-control w-25"
            onChange={handleInputChange}
            placeholder="Buscar solicitudes..."
            />
        
            {/* Botón con ícono que usa el mismo handler */}
            <SearchButton code={inputValue} onSearch={goHistorial} />
           
            <button className="btn btn-light" data-bs-toggle="modal" data-bs-target="#modalSolicitud">
                Crear Solicitud
            </button>
        </div>

        </div>
        
        {/* Búsqueda */}
        
        
        <div className="row">
            {/*<TablaRegistrados onRowClick={handleRowClick} />*/}
        </div>
        
        <RegistrarNuevo
            show={showModal}
            handleClose={() => setShowModal(false)}
        />
        <SolicitudesForm />
    </div>
  )
};

export default SolicitudTecnico;
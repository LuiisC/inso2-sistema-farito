import { useNavigate } from "react-router-dom"
import { useState } from "react";
import Fallas from "./Fallas";
import Reparaciones from "./Reparaciones";
import RegistrarNuevo from "./RegistrarNuevo";
import TablaRegistrados from "./TablaRegistrados";
import SearchButton from "./SearchButton";
import BackButtonHome from "./BackButtonHome";

const RegistroReparacion = () => {
  const [showModal, setShowModal] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    // Limpia el error cuando el usuario comienza a escribir
    if (error) {
      setError('');
    }
  };

   const handleRowClick = (name) => {
    setInputValue(name);
    // Limpia cualquier mensaje de error anterior
    setError('');
  };

  const handleClick = () => {
    // Valida que el campo no esté vacío
    if (inputValue.trim() === '') {
      //setError('El campo no puede estar vacío.');
      alert('Debe introducir un codigo de equipo')
      return; // Detiene la ejecución de la función
    }

    // Si la validación es exitosa, navega al historial
    navigate('/registro/historial');
  };


  return (
    <div className="">
      < BackButtonHome />
        <div className="row justify-content-center p-3">
          <div className="col-auto">
            <button
              className="btn btn-light" onClick={() => setShowModal(true)}
             >
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

        {/* --- Fila de búsqueda y acciones --- */}
        <div className="d-flex align-items-center gap-2 mb-4">
          <input 
            type="text" 
            value={inputValue}
            className="form-control w-25"
            onChange={handleInputChange}
            placeholder="Ingrese código del equipo..." 
          />
          <SearchButton/>
          <button className="btn btn-info" onClick={handleClick}>Ver historial</button>
          <button className="btn btn-danger">Eliminar</button>
        </div>

      <div className="row">
        {/* Tabla de datos dinamica*/}
        <TablaRegistrados onRowClick={handleRowClick}/>
                  
      </div>
        <RegistrarNuevo show={showModal} handleClose={() => setShowModal(false)} />
        <Fallas />
        <Reparaciones/>
    </div>
    
  )
}

export default RegistroReparacion

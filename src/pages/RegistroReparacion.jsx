import { Link } from "react-router-dom"
import Fallas from "./Fallas";
import Reparaciones from "./Reparaciones";

const RegistroReparacion = () => {
  return (
    <div className="">
        <div className="row justify-content-center p-3">
          <div className="col-4">
            <button
              className="btn btn-light" 
              data-bs-toggle="modal" 
              data-bs-target="#modalFalla"
              >
              Registrar Falla
            </button> 
          </div>
          <div className="col-4">
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
            className="form-control w-25" 
            placeholder="Ingrese código del equipo..." 
          />
          <button className="btn btn-info">Ver historial</button>
          <button className="btn btn-danger">Eliminar</button>
        </div>

        <div className="row">
          {/* Columna izquierda: Información del equipo */}
          <div className="col-md-6 mb-3">
            <div className="card p-3">
              <h5>Información del Equipo</h5>
              <p><strong>Código:</strong> 12345</p>
              <p><strong>Nombre:</strong> Equipo X</p>
              <p><strong>Modelo:</strong> ABC123</p>
              {/* Sale del backend*/}
            </div>
          </div>

          {/* Columna derecha: Último problema */}
          <div className="col-md-6 mb-3">
            <div className="card p-3">
              <h5>Último Problema</h5>
              <p><strong>Fecha:</strong> 01/09/2025</p>
              <p><strong>Falla:</strong> No enciende</p>
              <p><strong>Solución:</strong> Reemplazo de fuente</p>
            </div>
          </div>
        </div>
        <Fallas />
        <Reparaciones/>
    </div>
    
  )
}

export default RegistroReparacion
import { Link } from "react-router-dom"
import Fallas from "./Fallas";
import Reparaciones from "./Reparaciones";
import HistorialEquipo from "./HistorialEquipo";

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
        <div>
          <table className="table table-hover table-bordered">
            <thead className="table-primary">
              <tr>
                <th className="col-2" scope="col">Cod. Equipo</th>
                <th scope="col">Tipo</th> {/*Aqui iria pc o impresora */}
                <th scope="col">Estado</th>
                <th scope="col">Usuario Asignado</th>
                <th scope="col">Historial</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">P11</th>
                <td>Computadora</td>
                <td>En reparación</td>
                <td>RRHH</td>
                <td><Link to="historial">Ver historial</Link></td>
              </tr>
              <tr>
                <th scope="row">I3</th>
                <td>Impresora</td>
                <td>Reparado</td>
                <td>Contable</td>
                <td><Link to={HistorialEquipo}>Ver historial</Link></td>
              </tr>
              <tr>
                <th scope="row">P7</th>
                <td>Computadora</td>
                <td>Reparado</td>
                <td>Soporte técnico</td>
                <td><Link to={HistorialEquipo}>Ver historial</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
         
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
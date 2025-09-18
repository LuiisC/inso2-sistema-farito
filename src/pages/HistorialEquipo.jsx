import { Link } from "react-router-dom";
import Arrow from "../components/arrow_back_40.svg";

const HistorialEquipo = () => {
  return (
    <>
    <div className="d-flex align-items-center pb-2">
        <Link to="/registro" >
            <img src={Arrow} alt="Regresar" className="p-1 bg-white rounded-2"/>
        </Link>
        <h4 className='text-white p-2'>HISTORIAL</h4>
    </div>
    <div className="col-md-5 mb-3 ">
            <div className="card p-2">
              <h5>Información</h5>
              <p><strong>Equipo:</strong> HP ProDesk 400 G9 SFF</p>
              <p><strong>Código:</strong> PC-0010</p>
              <p><strong>Estado actual:</strong> En uso</p>
              {/* Sale del backend*/}
            </div>
          </div>
    
    <table className="table table-hover table-bordered">
          <thead className="table-primary">
            <tr>
              <th scope="col">Fecha de falla</th>
              <th scope="col">Tipo de evento</th>
              <th scope="col">Descripción del problema</th>
              <th scope="col">Fecha de reparación</th>
              <th scope="col">Acciones realizadas</th>
              <th scope="col">Usuario Asignado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">28/05/2025</th>
              <td>Mantenimiento técnico</td>
              <td>Se reinicia aleatoriamente</td>
              <td>15/06/2025</td>
              <td>Reemplazo fuente de poder</td>
              <td>RRHH</td>
            </tr>
            <tr>
              <th scope="row">12/12/2024</th>
              <td>Mantenimiento técnico</td>
              <td>Muy lento al iniciar Windows</td>
              <td>08/03/2025</td>
              <td>Reemplazo or SSD de 512GB</td>
              <td>Contable</td>
            </tr>
            <tr>
              <th scope="row">05/01/2024</th>
              <td>Registro inicial</td>
              <td>-</td>
              <td>05/01/2024</td>
              <td>Equipo registrado</td>
              <td>Soporte técnico</td>
            </tr>
          </tbody>
        </table>
    </>
  )
}

export default HistorialEquipo
import { Link } from "react-router-dom";
import Arrow from "../components/arrow_back_40.svg";

const HistorialEquipo = () => {

    // Datos del equipo traidos del backend teoricamente tiene que mandar la id y de ahi mostrar
  const datos_equipo = {cod_equipo:'PC-03', nombre:'HP ProDesk 400 G9 SFF', tipo: 'Computadora', estado: 'En reparación' , departamento: 'RRHH'};
  const detalles_equipo = [
    { fecha_f: '28/05/2025', tipo_evento: 'Mantenimiento técnico', desc: 'Se reinicia aleatoriamente', fecha_r: '15/06/2025', acciones_r: 'Reemplazo fuente de poder', usuario_a: 'Carlos Jimenez'},
    { fecha_f: '12/12/2024', tipo_evento: 'Mantenimiento técnico', desc: 'Muy lento al iniciar Windows', fecha_r: '08/03/2025', acciones_r: 'Reemplazo or SSD de 512GB', usuario_a: 'Mariana Soto'},
    { fecha_f: '05/01/2024', tipo_evento: 'Registro inicial', desc: '-' , fecha_r: '05/01/2024', acciones_r: 'Equipo registrado', usuario_a: 'Juan Perez'},
    { fecha_f: '', tipo_evento: '', desc: '' , fecha_r: '', acciones_r: '', usuario_a: ''},
  ];
  return (
    <>
    <h2 className="text-center">Historial Equipo</h2>
    <div className="d-flex align-items-center pb-2">
        <Link to="/registro" >
            <img src={Arrow} alt="Regresar" className="p-1 bg-white rounded-2"/>
        </Link>
        <h4 className='text-white p-2'>Registro</h4>
        
    </div>
    <div className="col-md-5 mb-3 ">
            <div className="card p-2">
              <h5>Información</h5>
              <p><strong>Tipo: </strong>{datos_equipo.tipo}</p>
              <p><strong>Equipo: </strong>{datos_equipo.nombre}</p>
              <p><strong>Código: </strong>{datos_equipo.cod_equipo}</p>
              <p><strong>Estado actual: </strong>{datos_equipo.estado}</p>
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
                {detalles_equipo.map((equipo, index) => (
                    <tr key={index}>
                        <td>{equipo.fecha_f}</td>
                        <td>{equipo.tipo_evento}</td>
                        <td>{equipo.desc}</td>
                        <td>{equipo.fecha_r}</td>
                        <td>{equipo.acciones_r}</td>
                        <td>{equipo.usuario_a}</td>
                    </tr>
                ))}
          </tbody>
        </table>
    </>
  )
}

export default HistorialEquipo
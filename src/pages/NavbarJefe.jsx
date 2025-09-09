import { Outlet, NavLink, Link } from 'react-router-dom';
import informesicon from "../components/bar_chart.svg"
import solicitudicon from "../components/solicitud-icon.svg";
import altatecnicos from "../components/person-add.svg";
import logout from "../components/logout.svg";
import account from "../components/account_box.svg"

function NavbarJefe() {
    return(
        <div className='container-fluid vh-100'>
            <div className='row h-100'>
                <div className="col-3 d-flex flex-column p-3" id="sidebar_farito">
                    <div className="row align-items-start">
                        <img src={account} className='img-fluid mb-2' alt='Usuario'/>
                        <p className='text-center mb-0'>Nombre Usuario</p>
                        <p className='text-center text-muted'>JEFE IT</p>
                    </div>
                    
                    <div className="flex-grow-1 d-flex flex-column">
                        <ul className="nav nav-pills flex-column">
                            <li className="nav-item">
                                <NavLink to="/solicitudesJefe" 
                                className={({ isActive }) => `nav-link text-black ${isActive ? 'bg-dark text-white' : ''}`
                                }>
                                    <img src={solicitudicon} className="me-2" alt="" /> Solicitudes pendientes
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/informes" 
                                className={({ isActive }) => `nav-link text-black ${isActive ? 'bg-dark text-white' : ''}`
                                }>
                                    <img src={informesicon} className="me-2" alt="" /> Informes
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/altatecnicos" 
                                className={({isActive}) => `nav-link text-black ${isActive ? 'bg-dark text-white' : ''}`
                                }>
                                    <img src={altatecnicos} className='me-2' alt='Alta técnicos' /> Alta Técnicos
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-auto">
                        <Link to="/logout" className="nav-link text-danger">
                            <img src={logout} className='me-2' alt='Boton cerrar sesion' /> Cerrar sesión
                        </Link>
                    </div>
                </div>

                <div className="col p-4" id="contenido-col-derecha">
                    <Outlet />
                </div>
            </div>
        </div>
        
    );
}
export default NavbarJefe;
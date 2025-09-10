import { Outlet, NavLink, Link } from 'react-router-dom';
import registroicon from "../components/registro-icon.svg"
import solicitudicon from "../components/solicitud-icon.svg";
import inventoryicon from "../components/inventory-icon.svg";
import altaicon from "../components/alta-equipos-icon.svg";
import logout from "../components/logout.svg";
import account from "../components/account_box.svg"

const Navbar = () => {
  return (
    <div className='container-fluid vh-100'>
            <div className='row h-100'>
                <div className="col-md-2 d-flex flex-column p-3" id="sidebar_farito">
                    <div className="row align-items-start">
                        <img src={account} className='img-fluid mb-2' alt='Usuario'/>
                        <p className='text-center mb-0'>Nombre Usuario</p>
                        <p className='text-center text-muted'>TECNICO</p>
                    </div>

                    <div className='flex-grow-1 d-flex flex-column'>
                        <ul className="nav nav-pills flex-column">
                            <li className="nav-item">
                                <NavLink to="/registro" 
                                className={({ isActive }) => `nav-link text-black ${isActive ? 'bg-dark text-white' : ''}`
                                }>
                                    <img src={registroicon} className="me-2" alt="" /> Registro
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/stock" 
                                className={({ isActive }) => `nav-link text-black ${isActive ? 'bg-dark text-white' : ''}`
                                }>
                                    <img src={inventoryicon} className="me-2" alt="" /> Stock
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/solicitud" 
                                className={({ isActive }) => `nav-link text-black ${isActive ? 'bg-dark text-white' : ''}`
                                }>
                                    <img src={solicitudicon} className="me-2" alt="" /> Solicitud
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/alta" 
                                className={({ isActive }) => `nav-link text-black ${isActive ? 'bg-dark text-white' : ''}`
                                }>
                                    <img src={altaicon} className="me-2" alt="" /> Alta
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
  )
}

export default Navbar
import { Outlet, NavLink, Link } from 'react-router-dom';
import icon1 from "../components/add2.svg";
import icon3 from "../components/create.svg";
import icon4 from "../components/inventory.svg";
import icon5 from "../components/terminal.svg";
import logout from "../components/logout.svg";
import account from "../components/account_box.svg"

const Navbar = () => {
  return (
    <div className='container-fluid vh-100'>
            <div className='row h-100'>
                <div className="col-3 d-flex flex-column p-3" id="sidebar_farito">
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
                                    <img src={icon1} className="me-2" alt="" /> Registro
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/stock" 
                                className={({ isActive }) => `nav-link text-black ${isActive ? 'bg-dark text-white' : ''}`
                                }>
                                    <img src={icon4} className="me-2" alt="" /> Stock
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/solicitud" 
                                className={({ isActive }) => `nav-link text-black ${isActive ? 'bg-dark text-white' : ''}`
                                }>
                                    <img src={icon5} className="me-2" alt="" /> Solicitud
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/alta" 
                                className={({ isActive }) => `nav-link text-black ${isActive ? 'bg-dark text-white' : ''}`
                                }>
                                    <img src={icon3} className="me-2" alt="" /> Alta
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
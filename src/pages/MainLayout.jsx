import React from 'react';
import logotype from "../components/logo_farito.jpeg";
import { Outlet, Link } from 'react-router-dom';

function MainLayout() {
    return(
        <div className='container-fluid vh-100'>
            <nav class="navbar-light bg-white text-center">
                <a class="navbar-brand" href="#">
                    <img src={logotype} width="60" height="60" class="d-inline-block align-center" alt="" />
                    FARITO
                </a>
            </nav>
            <div className='row h-100'>
                <div className="col-3 col-md-2 d-flex flex-column p-3" id="sidebar_farito">
                    <h4 className="text-center mb-4">
                        <span className='me-2 ms-2'></span>Nombre Usuario
                    </h4>
                    
                    <ul className="nav nav-pills flex-column">
                        <li className="nav-item">
                            <Link to="/equipos" className="nav-link text-white">Registrar Equipo</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/reparaciones" className="nav-link text-white">Registrar Reparación</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/informes" className="nav-link text-white">Informes</Link>
                        </li>
                        <li className="nav-item mt-auto">
                            <Link to="/logout" className="nav-link text-danger">Cerrar sesión</Link>
                        </li>
                    </ul>
                </div>
                <div className="col p-4" id="outlet">
                    <Outlet />
                </div>
            </div>
        </div>
        
    );
}
export default MainLayout;
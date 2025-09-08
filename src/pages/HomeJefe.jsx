import logotype from "../components/logo_farito.jpeg";
import { Outlet, Link } from 'react-router-dom';
import icon2 from "../components/bar_chart.svg";
import icon3 from "../components/create.svg";
import icon5 from "../components/terminal.svg";
import logout from "../components/logout.svg";
import account from "../components/account_box.svg"

function Home() {
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
                    <div className="text-center mb-4">
                        <img src={account} />
                        <p>Nombre Usuario</p>
                        <p>JEFE IT</p>
                    </div>
                    
                    <ul className="nav nav-pills flex-column">
                        <li className="nav-item">
                            <Link to="/solicitud" className="nav-link text-black"><img src={icon5} /> Solicitudes</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/informes" className="nav-link text-black"><img src={icon2} /> Informes</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/alta" className="nav-link text-black"><img src={icon3} /> Alta Tecnicos</Link>
                        </li>
                        <li className="nav-item mt-auto">
                            <Link to="/logout" className="nav-link text-danger"><img src={logout} /> Cerrar sesión</Link>
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
export default Home;
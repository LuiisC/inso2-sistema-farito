import logotype from "../components/logo_farito.jpeg";
import { Outlet, Link } from 'react-router-dom';
import informesicon from "../components/bar_chart.svg"
import solicitudicon from "../components/solicitud-icon.svg";
import altatecnicos from "../components/person-add.svg";
import logout from "../components/logout.svg";
import account from "../components/account_box.svg"

function Home() {
    return(
        <div>
            <h2 className="text-center">Pagina principal Jefe IT</h2>
        </div> 
    );
}
export default Home;
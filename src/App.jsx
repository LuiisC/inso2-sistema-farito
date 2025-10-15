import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import Login from './pages/Login.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Home from './pages/Home.jsx';
import HomeJefe from './pages/HomeJefe.jsx';
import Registro from './pages/RegistroReparacion.jsx';
import Layout from './pages/Layout.jsx';
import LayoutJefe from './pages/LayoutJefe.jsx';
import HistorialEquipo from './pages/HistorialEquipo.jsx';
import Informes from './pages/jefe/Informes.jsx';
import Solicitudes from './pages/jefe/Solicitudes.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />

        <Route element={ <Layout /> }>
            <Route path="/home" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/stock" element={<div>Stock</div>} />
            <Route path="/solicitud" element={<div>Solicitud</div>} />
            <Route path="/alta" element={<div>Alta</div>} />
            <Route path="/registro/historial" element={<HistorialEquipo />} />
            
        </Route>     
        
        <Route element={ <LayoutJefe /> }>
            <Route path="/homejefe" element={<HomeJefe />} />
            <Route path="/informes" element={<Informes />} />
            <Route path="/solicitudesjefe" element={<Solicitudes />} />
            <Route path="/altatecnicos" element={<div>Alta de técnicos</div>} />
        </Route>
        <Route path="logout" element={<div>Cerrando sesión...</div>} />
      </Routes>
    </Router>
    );
}
export default App;
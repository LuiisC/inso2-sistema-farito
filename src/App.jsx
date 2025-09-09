import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import Login from './pages/Login.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Home from './pages/Home.jsx';
import HomeJefe from './pages/HomeJefe.jsx';
import Registro from './pages/RegistroReparacion.jsx';
import Layout from './pages/Layout.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={ <Layout /> }>
            <Route path="/home" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/stock" element={<div>Stock</div>} />
            <Route path="/solicitud" element={<div>Solicitud</div>} />
            <Route path="/alta" element={<div>Alta</div>} />
        </Route>
        

        <Route 
          path='/homejefe'
          element= { <HomeJefe /> }>
            <Route path="informes" element={<div>Informes</div>} />
        </Route>       
        
        <Route path="logout" element={<div>Cerrando sesión...</div>} />
      </Routes>
  </Router>
    );
}
export default App;
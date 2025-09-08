import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import RutaProtegida from './components/RutaProtegida.jsx';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="registro" element={<div>Registro</div> } />
        <Route path="stock" element={<div>Stock</div>} />
        <Route path="solicitud" element={<div>Solicitud</div>} />
        <Route path="informes" element={<div>Informes</div>} />
        <Route path="alta" element={<div>Alta</div>} />
        <Route path="logout" element={<div>Cerrando sesión...</div>} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
    );
}
export default App;
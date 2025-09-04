import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import './App.css'
import Home from './pages/Home.jsx';

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
        <Route path="/login" element={<div>Página de Login</div>} />
      </Routes>
    </Router>
    );
}
export default App;
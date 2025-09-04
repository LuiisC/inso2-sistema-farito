import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import './App.css'
import MainLayout from './pages/MainLayout.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="equipos" element={<div>Equipos</div> } />
          <Route path="reparaciones" element={<div>Registrar Reparación</div>} />
          <Route path="informes" element={<div>Informes</div>} />
          <Route path="logout" element={<div>Cerrando sesión...</div>} />
        </Route>
        <Route path="/login" element={<div>Página de Login</div>} />
      </Routes>
    </Router>
    );
}
export default App;
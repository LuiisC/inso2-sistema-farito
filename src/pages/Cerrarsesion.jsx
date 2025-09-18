import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import logout from "../components/logout.svg";

const Cerrarsesion = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleLogout = () => {
    localStorage.clear(); 
    sessionStorage.clear();

    handleClose();

    navigate("/login", { replace: true });

    console.log("Sesión cerrada y redirigido a /login");
  };

  return (
    <div>
      <button className="nav-link text-black border-0 bg-transparent" onClick={handleShow}>
        <img src={logout} className="me-2" alt="Cerrar sesión" /> Cerrar sesión
      </button>

      {/* Modal*/}
      {show && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
              <div className="modal-content shadow-lg border-0 rounded-3">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">Confirmar cierre de sesión</h5>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <p>¿Estás seguro de que deseas cerrar sesión?</p>
                </div>
                <div className="modal-footer d-flex justify-content-center gap-5">
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg w-25"
                    onClick={handleClose}
                  >
                    NO
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg w-25"
                    onClick={handleLogout}
                  >
                    SI
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Fondo del modal */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default Cerrarsesion;

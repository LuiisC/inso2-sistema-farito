import { useState, useEffect } from "react";
import axios from "axios";

const SolicitudesForm = () => {
    const [codigo, setCodigo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [fecha, setFecha] = useState("");
    const [errorDescripcion, setErrorDescripcion] = useState("");
    const [errorEvento, setErrorEvento] = useState("");
    
    const limpiarFormulario = () => {
        setCodigo("");
        setTipo("");
        setEvento("");
        setDescripcion("");
        setFecha("");
        setId("");
        setErrorDescripcion("");
        setErrorEvento("");
    };
    
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    const fechaMax = today.toISOString().split("T")[0];
    
    const generarIdPorCodigo = (codigo) => {
        const notificacionesAnteriores = JSON.parse(localStorage.getItem("notificacionesFalla")) || [];
        const fallasDelEquipo = notificacionesAnteriores.filter(
            (falla) => falla.codigo === codigo );
            return String(fallasDelEquipo.length + 1).padStart(3, "0");
    };
    
    const formatearFecha = (fechaISO) => {
        const [year, month, day] = fechaISO.split("-");
        return `${day}/${month}/${year}`;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones
        if (evento.trim().length < 5) {
        setErrorEvento("Este campo debe tener al menos 5 caracteres.");
        return;
        }

        if (descripcion.trim().length < 20) {
        setErrorDescripcion("Este campo debe tener al menos 20 caracteres.");
        return;
        }

        // Formato de fecha requerido por el backend: dd/MM/yyyy
        const fechaFormateada = formatearFecha(fecha);

        const dto = {
        codigoEquipo: codigo,
        tipoEvento: evento,
        descripcionProblema: descripcion,
        fechaRegistro: fechaFormateada,
        };
        try {
            const response = await axios.post(
                "http://localhost:3000/solicitudcomponente", // Cambia si tu URL es diferente AQUI HAY QUE CAMBIARLO
                dto
            );

            setMensaje("✅ Solicitud creada con éxito");
            limpiarFormulario();
        } catch (error) {
            console.error(error);
            if (error.response?.data?.message) {
                setMensaje(`❌ ${error.response.data.message}`);
            } else { 
                setMensaje("❌ Error al registrar la solicitud");
            }
        }
  };

  useEffect(() => {
    const modal = document.getElementById("modalSolicitud");
    const handleClose = () => {
      limpiarFormulario();
      setMensaje("");
    };
    modal.addEventListener("hidden.bs.modal", handleClose);
    return () => {
      modal.removeEventListener("hidden.bs.modal", handleClose);
    };
  }, []);

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    setter(value);
    if (mensaje) setMensaje("");

    if (setter === setEvento) {
      if (value.trim().length < 5) {
        setErrorEvento("Este campo debe tener al menos 5 caracteres.");
      } else {
        setErrorEvento("");
      }
    }

    if (setter === setDescripcion) {
      if (value.trim().length < 15) {
        setErrorDescripcion("Este campo debe tener al menos 15 caracteres.");
      } else {
        setErrorDescripcion("");
      }
    }
  };
  return (
    <>
      <div className="modal fade" id="modalSolicitud" tabIndex="-1" aria-labelledby="modalSolicitudLabel" aria-hidden="true">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalSolicitudLabel">
                Registrar solicitud de componente
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>

            <div className="modal-body">
              {mensaje && <div className="alert alert-info">{mensaje}</div>}

              <form onSubmit={handleSubmit}>
                {/*Seccion marca */}
                <div className="pb-4">
                  <label className="form-label">Marca</label>
                  <input
                  type="text"
                  className={`form-control ${
                    errorEvento ? "is-invalid" : ""
                  }`}
                  value={marca}
                  placeholder="Marca del componente"
                  onChange={handleInputChange(setMarca)}
                  required
                  />
                </div>

                <div className="mb-3 d-flex align-items-end gap-3">
                  {/*Seccion modelo */}
                  <div>
                    <label className="form-label">Modelo</label>
                    <input 
                      type="text"
                      className={`form-control ${
                        errorEvento ? "is-invalid" : ""
                      }`}
                      value={modelo}
                      placeholder="Modelo..."
                      onChange={handleInputChange(setModelo)}
                      required
                    />
                    {errorEvento && (
                      <div className="invalid-feedback">{errorEvento}</div>
                    )}
                  </div>
                  {/*Seccion cantidad */}
                  <div>
                    <label className="form-label">Cantidad</label>
                    <input
                      type="number"
                      min="1"
                      className="form-control custom-input"
                      value={cantidad}
                      onChange={(e) => {
                        const nuevoCantidad = e.target.value;
                        setCantidad(nuevoCantidad);
                        setId(generarIdPorCodigo(nuevoCodigo));
                        if (mensaje) setMensaje("");
                      }}
                      required
                    />
                  </div>                  
                </div>

                {/*Seccion Descripcion */}
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className={`form-control ${
                      errorDescripcion ? "is-invalid" : ""
                    }`}
                    rows="3"
                    value={descripcion}
                    placeholder="Descripción del componente"
                    onChange={handleInputChange(setDescripcion)}
                    required
                  ></textarea>
                  {errorDescripcion && (
                    <div className="invalid-feedback">{errorDescripcion}</div>
                  )}
                </div>


                <div className="mb-3 d-flex align-items-end gap-3">
                  <div>
                    <label className="form-label">Fecha</label>
                    <input
                      type="date"
                      className="form-control"
                      value={fecha}
                      onChange={handleInputChange(setFecha)}
                      max={fechaMax}
                      required
                    />
                  </div>

                </div>

                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SolicitudesForm
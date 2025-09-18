
import { useState, useEffect } from "react";

const Fallas = () => {
  const [codigo, setCodigo] = useState("");
  const [tipo, setTipo] = useState("");
  const [evento, setEvento] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [mensaje, setMensaje] = useState("");

  const limpiarFormulario = () => {
  setCodigo("");
  setTipo("");
  setEvento("");
  setDescripcion("");
  setFecha("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //  hacer fetch/axios
    console.log({
      codigo,
      tipo,
      evento,
      descripcion,
      fecha,
      estado: "En reparación",
    });

    setMensaje("✅ Registro guardado con éxito");
    limpiarFormulario();
  };

  // limpia los campos del formulario 
  useEffect(() => {
    const modal = document.getElementById("modalFalla");

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
  setter(e.target.value);
  if (mensaje) setMensaje(""); // Limpia el mensaje de exito al cargar de nuevo los datos sin salir del modal
  };


  return (
    <>
      {/* Modal y formulario*/}
      <div
        className="modal fade"
        id="modalFalla"
        tabIndex="-1"
        aria-labelledby="modalFallaLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalFallaLabel">
                Registrar Falla
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            
            <div className="modal-body">
              {mensaje && (
                <div className="alert alert-success">{mensaje}</div>
              )}
              {/* Formulario de registar Falla*/}

              <form onSubmit={handleSubmit}>
                <div className="mb-3 d-flex align-items-end gap-3">
                  <div>
                     <label className="form-label">Código del equipo</label>
                     <input
                         type="text"
                         className="form-control custom-input"
                         placeholder="Ingrese Código" 
                         value={codigo}
                         //onChange={(e) => setCodigo(e.target.value)}
                         onChange={handleInputChange(setCodigo)}
                         required
                      />
                  </div>

                   <div>
                      <label className="form-label">Tipo de equipo</label>
                          <select
                             className="form-select"
                             value={tipo}
                             //onChange={(e) => setTipo(e.target.value)}
                             onChange={handleInputChange(setTipo)}
                            required
                          >
                            <option value="">Seleccione...</option>
                            <option value="Computadora">Computadora</option>
                            <option value="Impresora">Impresora</option>
                          </select>
                      </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Tipo de Evento</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={evento}
                    //onChange={(e) => setEvento(e.target.value)}
                    onChange={handleInputChange(setEvento)}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Descripción del problema</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={descripcion}
                    //onChange={(e) => setDescripcion(e.target.value)}
                    onChange={handleInputChange(setDescripcion)}
                    required
                  ></textarea>
                </div>

                <div className="mb-3 d-flex align-items-end gap-3">
                  <div>
                    <label className="form-label">Fecha </label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="dd/mm/aaaa"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      //onChange={handleInputChange(setFecha)}
                      pattern="\d{2}/\d{2}/\d{4}"
                      max={new Date().toISOString().split("T")[0]} //no permite poner fechas futuras
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Estado</label>
                    <input
                      type="text"
                      className="form-control w-75"
                      value="En reparación"
                      disabled
                    />
                  </div>
                </div>
               {/*Botones de cancela y guardar */} 
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
  );
};

export default Fallas;


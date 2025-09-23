import { useState, useEffect } from "react";

const Fallas = () => {
  const [codigo, setCodigo] = useState("");
  const [tipo, setTipo] = useState("");
  const [evento, setEvento] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [id, setId] = useState("");
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
  //toma la fecha local 
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const fechaMax = today.toISOString().split("T")[0];

  //genera el el id segun el codigo  del equipo
  const generarIdPorCodigo = (codigo) => {
    const notificacionesAnteriores =
      JSON.parse(localStorage.getItem("notificacionesFalla")) || [];
    const fallasDelEquipo = notificacionesAnteriores.filter(
      (falla) => falla.codigo === codigo
    );
    return String(fallasDelEquipo.length + 1).padStart(3, "0");
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
    
    // Validacion de los caracteres de tipo de evento y descripcion del problema
    if (evento.trim().length < 10) {
    setErrorEvento("Este campo debe tener al menos 10 caracteres.");
    return;
    }

    if (descripcion.trim().length < 20) {
    setErrorDescripcion("Este campo debe tener al menos 20 caracteres.");
    return;
    }
    const notificacionesAnteriores = JSON.parse(localStorage.getItem("notificacionesFalla")) || [];

    const nuevaFalla = {
      id,
      codigo,
      tipo,
      evento,
      descripcion,
      fecha,
      estado: "En reparación",
    };

    notificacionesAnteriores.push(nuevaFalla);
    localStorage.setItem("notificacionesFalla", JSON.stringify(notificacionesAnteriores)); //notificaciones
    setMensaje("✅ Registro guardado con éxito");
    limpiarFormulario();

  };

  // limpia los campos del formulario al cerrar el modal
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
    const value = e.target.value;
    setter(value);
    if (mensaje) setMensaje("");  //Limpia el mensaje de exito al cargar de nuevo los datos sin salir del modal
    
    // validacion de los campos de tipo de evento y dedescripcion del problema
    if (setter === setEvento) {
     if (value.trim().length < 10) {
      setErrorEvento("Este campo debe tener al menos 10 caracteres.");
     } else {
      setErrorEvento("");
     }
    }

    if (setter === setDescripcion) {
     if (value.trim().length < 20) {
      setErrorDescripcion("Este campo debe tener al menos 20 caracteres");
     } else {
      setErrorDescripcion("");
     }
    }  
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
              {/* Formulario de registrar Falla*/}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">ID de Falla</label>
                  <input
                    type="text"
                    className="form-control w-25"
                    value={id}
                    disabled
                  />
                </div>

                <div className="mb-3 d-flex align-items-end gap-3">
                  <div>
                    <label className="form-label">Código del equipo</label>
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder="Ingrese Código"
                      value={codigo}
                      onChange={(e) => {
                        const nuevoCodigo = e.target.value;
                        setCodigo(nuevoCodigo);
                        setId(generarIdPorCodigo(nuevoCodigo));
                        if (mensaje) setMensaje("");
                      }}
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
                    className={`form-control ${errorEvento ? "is-invalid" : ""}`}
                    rows="3"
                    value={evento}
                    //onChange={(e) => setEvento(e.target.value)}
                    onChange={handleInputChange(setEvento)}
                    required
                  ></textarea>
                  {errorEvento && (
                    <div className="invalid-feedback">{errorEvento}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Descripción del problema</label>
                  <textarea
                    className={`form-control ${errorDescripcion ? "is-invalid" : ""}`}
                    rows="3"
                    value={descripcion}
                    //onChange={(e) => setDescripcion(e.target.value)}
                    onChange={handleInputChange(setDescripcion)}
                    required
                  ></textarea>
                  {errorDescripcion && (
                    <div className="invalid-feedback">{errorDescripcion}</div>
                  )}
                </div>

                <div className="mb-3 d-flex align-items-end gap-3">
                  <div>
                    <label className="form-label">Fecha </label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="dd/mm/aaaa"
                      value={fecha}
                      onChange={handleInputChange(setFecha)}
                      //onChange={(e) => setFecha(e.target.value)}
                      max={fechaMax}
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

                {/* Botones de cancelar y guardar */}
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
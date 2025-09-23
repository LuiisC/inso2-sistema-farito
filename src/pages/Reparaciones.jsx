import { useState, useEffect } from "react";

const Reparaciones = () => {
  const [codigo, setCodigo] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [id, setId] = useState(""); 
  const [errorDescripcion, setErrorDescripcion] = useState("");

  const limpiarFormulario = () => {
    setCodigo("");
    setTipo("");
    setDescripcion("");
    setFecha("");
    setId("");
    setErrorDescripcion("");
  };
  // muestra la fecha local
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const fechaMax = today.toISOString().split("T")[0];

  // busca la falla registrado con ese ID y modifica dicha notificacion 
  const buscarIdDeFalla = (codigoEquipo) => {
    const notificaciones = JSON.parse(localStorage.getItem("notificacionesFalla")) || [];
    const falla = [...notificaciones]
      .reverse()
      .find((f) => f.codigo === codigoEquipo && f.estado === "En reparación");
    return falla ? falla.id : "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   //hacer fetch/axios al backend
    console.log({
      codigo,
      tipo,
      descripcion,
      fecha,
      estado: "reparado",
    });
    // indexa a la falla registro
    const notificaciones = JSON.parse(localStorage.getItem("notificacionesFalla")) || [];

    const indexFalla = notificaciones.findIndex(
      (f) => f.codigo === codigo && f.estado === "En reparación"
    );
    
    //Valida que el campo de descripcionn de reparacion almenos tenga 20 caracteres
    if (descripcion.trim().length < 20) {
    setErrorDescripcion("Este campo debe tener al menos 20 caracteres.");
    return;
    }

    if (indexFalla === -1) {
      setMensaje("⚠️ No se encontró una falla pendiente para este código de equipo.");
      return;
    }
    // actualiza la notificacion 
    notificaciones[indexFalla] = {
      ...notificaciones[indexFalla],
      acciones: descripcion,
      fechaReparacion: fecha,
      estado: "Reparado",
    };

    localStorage.setItem("notificacionesFalla", JSON.stringify(notificaciones));

    setMensaje("✅ Registro guardado con éxito");
    limpiarFormulario();
  };
  // limpia los campos al cerrar el modal 
  useEffect(() => {
    const modal = document.getElementById("modalReparacion");

    const handleClose = () => {
      limpiarFormulario();
      setMensaje("");
    };

    modal.addEventListener("hidden.bs.modal", handleClose);

    return () => {
      modal.removeEventListener("hidden.bs.modal", handleClose);
    };
  }, []);

  const handleCodigoChange = (e) => {
    const nuevoCodigo = e.target.value;
    setCodigo(nuevoCodigo);

    const idFalla = buscarIdDeFalla(nuevoCodigo);
    setId(idFalla); //muestra el ID en el campo correspondiente
    
    if (!idFalla) {
    setMensaje("⚠️ No se encontró una falla pendiente para este código de equipo.");
    } else {
    setMensaje(""); // Limpia el  mensaje si se encuentra el ID correcto
    }  
    
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    setter(value);
    if (mensaje) setMensaje(""); //limpia el mensaje de exito al cargar de nuevo los datos sin salir del modal
        if (setter === setDescripcion) {

    if (value.trim().length < 20) {
      setErrorDescripcion("Este campo debe tener al menos 20 caracteres.");
     } else {
      setErrorDescripcion("");
     }
    } 
  };

  return (
    <>
      <div
        className="modal fade"
        id="modalReparacion"
        tabIndex="-1"
        aria-labelledby="modalReparacionLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalReparacionLabel">
                Registrar Reparación
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
               <div
                  className={`alert ${
                  mensaje.startsWith("⚠️") ? "alert-danger" : "alert-success"
                  }`}
                  >
                 {mensaje}
                </div>
              )}

              {/* Formulario de registar Reparacion*/}
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
                      //onChange={(e) => setCodigo(e.target.value)}
                      onChange={handleCodigoChange}
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
                  <label className="form-label">Descripción de Reparación</label>
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
                      value={fecha}
                      //onChange={(e) => setFecha(e.target.value)}
                      onChange={handleInputChange(setFecha)}
                      max={fechaMax}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Estado</label>
                    <input
                      type="text"
                      className="form-control w-75"
                      value="Reparado"
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

export default Reparaciones;

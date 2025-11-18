import { useState, useEffect } from "react";
import axios from "axios";

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
  const [errorCodigo, setErrorCodigo] = useState("");


  const limpiarFormulario = () => {
    setCodigo("");
    setTipo("");
    setEvento("");
    setDescripcion("");
    setFecha("");
    setId("");
    setErrorDescripcion("");
    setErrorEvento("");
    setErrorCodigo("");
  };
 
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const fechaMax = today.toISOString().split("T")[0];

  const fechaMinDate = new Date(today);
  fechaMinDate.setDate(today.getDate() - 4);
  const fechaMin = fechaMinDate.toISOString().split("T")[0];

  const generarIdPorCodigo = (codigo) => {
    const notificacionesAnteriores =
      JSON.parse(localStorage.getItem("notificacionesFalla")) || [];
    const fallasDelEquipo = notificacionesAnteriores.filter(
      (falla) => falla.codigo === codigo
    );
    return String(fallasDelEquipo.length + 1).padStart(3, "0");
  };

  const formatearFecha = (fechaISO) => {
    const [year, month, day] = fechaISO.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    const codigoValido = /^[A-Z]-\d{3}$/;
    if (!codigoValido.test(codigo.trim())) {
     setErrorCodigo("Formato inválido.Ej: I-001 o C-002");
    } else {
     setErrorCodigo("");
    }

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
        "http://localhost:3000/reparaciones", // Cambia si tu URL es diferente
        dto
      );
      // se crea una notificacion localmente cuando se registra 
      const nuevaNotificacion = {
      tipo: tipo,
      codigo,
      evento,
      estado: "En reparación",
      fecha,
      };
      const notificacionesPrevias=
        JSON.parse(localStorage.getItem("notificacionesFalla")) || [];

      localStorage.setItem(
      "notificacionesFalla",
      JSON.stringify([nuevaNotificacion, ...notificacionesPrevias])
      );
      window.dispatchEvent(new Event("notificacionesActualizadas"));

      setMensaje("✅ Registro guardado con éxito");
      limpiarFormulario();
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        setMensaje(`❌ ${error.response.data.message}`);
      } else {
        setMensaje("❌ Error al registrar la falla");
      }
    }
  };

  useEffect(() => {
    const modal = document.getElementById("modalFalla");
    if (!modal) return;
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
      if (value.trim().length < 20) {
        setErrorDescripcion("Este campo debe tener al menos 20 caracteres.");
      } else {
        setErrorDescripcion("");
      }
    }
    if (setter === setCodigo) {
      const codigoValido = /^[A-Z]-\d{3}$/;
      if (!codigoValido.test(value.trim())) {
        setErrorCodigo("Formato inválido.Ej:I-001 o C-002");
      } else {
        setErrorCodigo("");
      }
    }
    if (setter === setCodigo || setter === setTipo) {
      const prefijo = (setter === setCodigo ? value.trim().charAt(0) : codigo.trim().charAt(0));
      const tipoSeleccionado = (setter === setTipo ? value : tipo);
      if (
        (prefijo === "C" && tipoSeleccionado === "Impresora") ||
        (prefijo === "I" && tipoSeleccionado === "Computadora")
      ) {
          setMensaje("⚠️ El código no coincide con el tipo de equipo seleccionado.");
      } else {
          setMensaje("");
      }
    }
  };

  return (
    <>
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
                <div
                    className={`alert ${
                      mensaje.includes("❌")
                        ? "alert-danger" // rojo para errores
                        : mensaje.includes("⚠️")
                        ? "alert-warning" // amarillo para advertencias
                        : "alert-success" // verde para mensajes OK
                    }`}
                >
                 {mensaje}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3 d-flex align-items-start gap-3">
                  <div>
                    <label className="form-label">Código del equipo</label>
                    <input
                      type="text"
                      className={`form-control ${errorCodigo ? "is-invalid" : ""}`}
                      placeholder="EJ: C-00X / I-00X"
                      value={codigo}
                      onChange={handleInputChange(setCodigo)}
                      //onChange={(e) => {
                      //  const nuevoCodigo = e.target.value;
                      //  setCodigo(nuevoCodigo);
                      //  setId(generarIdPorCodigo(nuevoCodigo));
                      //  if (mensaje) setMensaje("");
                      //}}
                      required
                    />
                    {errorCodigo && <div className="invalid-feedback">{errorCodigo}</div>}
                  </div>

                  <div>
                    <label className="form-label">Tipo de equipo</label>
                    <select
                      className="form-select"
                      value={tipo}
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
                    className={`form-control ${
                      errorEvento ? "is-invalid" : ""
                    }`}
                    rows="3"
                    value={evento}
                    placeholder="Hardware, Software, Redes, Otro..."
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
                    className={`form-control ${
                      errorDescripcion ? "is-invalid" : ""
                    }`}
                    rows="3"
                    value={descripcion}
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
                      min={fechaMin}
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
  );
};

export default Fallas;

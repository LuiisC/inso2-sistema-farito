import { useState } from "react";

const API = "http://localhost:3000/reparaciones";

function toDDMMYYYY(yyyyMMdd) {
  if (!yyyyMMdd) return "";
  const [y, m, d] = yyyyMMdd.split("-");
  return `${d}/${m}/${y}`;
}

const Reparaciones = () => {
  const [codigo, setCodigo] = useState("");
  const [tipo, setTipo] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [fecha, setFecha] = useState("");
  const [mensaje, setMensaje] = useState(""); // muestra exactamente lo del backend
  const [ok, setOk] = useState(null); // null | true | false
  const [id, setId] = useState("");
  const [errorDescripcion, setErrorDescripcion] = useState("");
  const [errorDiagnostico, setErrorDiagnostico] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const limpiarFormulario = () => {
    setCodigo("");
    setTipo("");
    setDiagnostico("");
    setDescripcion("");
    setTecnico("");
    setFecha("");
    setId("");
    setErrorDescripcion("");
    setErrorDiagnostico("");
  };

  // fecha máxima hoy (local)
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const fechaMax = today.toISOString().split("T")[0];

  // consulta al backend si hay falla abierta por código
  const fetchFallaAbierta = async (codigoEquipo) => {
    if (!codigoEquipo) return;
    setBuscando(true);
    try {
      const res = await fetch(
        `${API}/abierta?codigo=${encodeURIComponent(codigoEquipo)}`,
        {
          cache: "no-store",
        }
      );
      const data = await res.json();
      if (data?.abierta && data.id) {
        setId(String(data.id));
        setMensaje("");
        setOk(null);
      } else {
        setId("");
        setMensaje("No existe una falla abierta para el equipo indicado.");
        setOk(false);
      }
    } catch {
      setId("");
      setMensaje("Error consultando el estado del equipo.");
      setOk(false);
    } finally {
      setBuscando(false);
    }
  };

  const handleCodigoChange = (e) => {
    const nuevoCodigo = e.target.value;
    setCodigo(nuevoCodigo);
    // no bloquees por mensajes previos
    if (nuevoCodigo.trim().length >= 3) {
      fetchFallaAbierta(nuevoCodigo.trim());
    } else {
      setId("");
      setMensaje("");
      setOk(null);
    }
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    setter(value);
    // limpiar estado de mensaje para permitir 2do submit
    if (mensaje) setMensaje("");

    if (setter === setDiagnostico) {
      if (value.trim().length < 10)
        setErrorDiagnostico("Debe tener al menos 10 caracteres.");
      else setErrorDiagnostico("");
    }

    if (setter === setDescripcion) {
      if (value.trim().length < 20)
        setErrorDescripcion("Debe tener al menos 20 caracteres.");
      else setErrorDescripcion("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validaciones mínimas
    if (!codigo.trim()) {
      setMensaje('Código inválido: debe comenzar con "C-" o "I-".');
      setOk(false);
      return;
    }
    if (!fecha) {
      setMensaje("Fecha inválida. Formato esperado: dd/MM/yyyy");
      setOk(false);
      return;
    }
    if (diagnostico.trim().length < 10) {
      setErrorDiagnostico("Debe tener al menos 10 caracteres.");
      setOk(false);
      return;
    }
    if (descripcion.trim().length < 20) {
      setErrorDescripcion("Debe tener al menos 20 caracteres.");
      setOk(false);
      return;
    }
    if (!id) {
      setMensaje("No existe una falla abierta para el equipo indicado.");
      setOk(false);
      return;
    }

    setGuardando(true);
    try {
      const payload = {
        codigoEquipo: codigo.trim(),
        fechaReparacion: toDDMMYYYY(fecha), // dd/MM/yyyy
        diagnostico: diagnostico.trim(),
        accionesRealizadas: descripcion.trim(),
        tecnico: tecnico.trim() || undefined,
      };

      const res = await fetch(`${API}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      const text = await res.text(); // a veces el backend no manda JSON estricto
      let body;
      try {
        body = text ? JSON.parse(text) : {};
      } catch {
        body = { message: text };
      }

      if (!res.ok) {
        // muestra mensaje del backend tal cual
        const raw = body?.message ?? text ?? "Error";
        const msg = Array.isArray(raw) ? raw.join(", ") : String(raw);
        setMensaje(msg);
        setOk(false);
        return;
      }

      // éxito: también mostramos lo que venga si deseas; si no, mensaje controlado:
      setMensaje("Registro de reparación guardado con éxito");
      setOk(true);

      // listo para un 2do submit:
      limpiarFormulario();
    } catch {
      setMensaje("Error de conexión con el servidor");
      setOk(false);
    } finally {
      setGuardando(false);
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
              {mensaje !== "" && (
                <div
                  className={`alert ${
                    ok === false ? "alert-danger" : "alert-success"
                  }`}
                >
                  {mensaje}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">ID de Falla</label>
                  <input
                    type="text"
                    className="form-control w-25"
                    value={buscando ? "..." : id}
                    disabled
                  />
                </div>

                <div className="mb-3 d-flex align-items-end gap-3">
                  <div>
                    <label className="form-label">Código del equipo</label>
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder="C-001 / I-001"
                      value={codigo}
                      onChange={handleCodigoChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Tipo de equipo</label>
                    <select
                      className="form-select"
                      value={tipo}
                      onChange={handleInputChange(setTipo)}
                    >
                      <option value="">Seleccione...</option>
                      <option value="Computadora">Computadora</option>
                      <option value="Impresora">Impresora</option>
                    </select>
                  </div>
                </div>

                {/* Diagnóstico */}
                <div className="mb-3">
                  <label className="form-label">Diagnóstico</label>
                  <textarea
                    className={`form-control ${
                      errorDiagnostico ? "is-invalid" : ""
                    }`}
                    rows="3"
                    value={diagnostico}
                    onChange={handleInputChange(setDiagnostico)}
                    required
                  />
                  {errorDiagnostico && (
                    <div className="invalid-feedback">{errorDiagnostico}</div>
                  )}
                </div>

                {/* Descripción / Acciones realizadas */}
                <div className="mb-3">
                  <label className="form-label">
                    Descripción de Reparación (acciones realizadas)
                  </label>
                  <textarea
                    className={`form-control ${
                      errorDescripcion ? "is-invalid" : ""
                    }`}
                    rows="3"
                    value={descripcion}
                    onChange={handleInputChange(setDescripcion)}
                    required
                  />
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

                  <div>
                    <label className="form-label">Técnico (opcional)</label>
                    <input
                      type="text"
                      className="form-control w-75"
                      value={tecnico}
                      onChange={handleInputChange(setTecnico)}
                    />
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    data-bs-dismiss="modal"
                    disabled={guardando}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={guardando}
                  >
                    {guardando ? "Guardando…" : "Guardar"}
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

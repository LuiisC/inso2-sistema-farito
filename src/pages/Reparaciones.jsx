import { useState } from "react";

const Reparaciones = () => {
  const [codigo, setCodigo] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [mensaje, setMensaje] = useState("");

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

    setMensaje("✅ Registro guardado con éxito");

    // Limpiar formulario
    setCodigo("");
    setTipo("");
    setDescripcion("");
    setFecha("");
  };

  return (
    <>
      {/* Modal y formulario*/}
      <div
        className="modal fade"
        id="modalReparacion"
        tabIndex="-1"
        aria-labelledby="modalFallaLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalFallaLabel">
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
                         value={codigo}
                         onChange={(e) => setCodigo(e.target.value)}
                         required
                      />
                  </div>

                   <div>
                      <label className="form-label">Tipo de equipo</label>
                          <select
                             className="form-select"
                             value={tipo}
                             onChange={(e) => setTipo(e.target.value)}
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
                    className="form-control"
                    rows="3"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
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
                      pattern="\d{2}/\d{2}/\d{4}"
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

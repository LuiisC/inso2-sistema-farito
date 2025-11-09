import { useState } from "react";
import axios from "axios";

const SolicitudesForm = ({ show, handleClose, onSolicitudCreada }) => {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errorDescripcion, setErrorDescripcion] = useState("");

  const limpiarFormulario = () => {
    setMarca("");
    setModelo("");
    setCantidad("");
    setDescripcion("");
    setFecha("");
    setErrorDescripcion("");
    setMensaje("");
  };

  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const fechaMax = today.toISOString().split("T")[0];

  const formatearFecha = (fechaISO) => {
    const [year, month, day] = fechaISO.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (descripcion.trim().length < 10) {
      setErrorDescripcion("La descripción debe tener al menos 10 caracteres.");
      return;
    }

    const dto = {
      marca,
      modelo,
      cantidad: Number(cantidad),
      descripcion,
      fechaRegistro: formatearFecha(fecha),
    };

    try {
      const response = await axios.post("http://localhost:3000/solicitudes", dto);
      setMensaje("✅ Solicitud creada con éxito");

      limpiarFormulario();

      if (onSolicitudCreada) onSolicitudCreada(response.data);

      // Cierra el modal automáticamente después de 1 segundo
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error(error);
      setMensaje(error.response?.data?.message || "❌ Error al registrar la solicitud");
    }
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    setter(value);
    if (mensaje) setMensaje("");

    if (setter === setDescripcion) {
      if (value.trim().length < 10) {
        setErrorDescripcion("La descripción debe tener al menos 10 caracteres.");
      } else {
        setErrorDescripcion("");
      }
    }
  };

  if (!show) return null; // 🔥 no renderiza nada si no está visible

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Registrar solicitud</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>

          <div className="modal-body">
            {mensaje && <div className="alert alert-info">{mensaje}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Marca</label>
                <input
                  type="text"
                  className="form-control"
                  value={marca}
                  onChange={handleInputChange(setMarca)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Modelo</label>
                <input
                  type="text"
                  className="form-control"
                  value={modelo}
                  onChange={handleInputChange(setModelo)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Cantidad</label>
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  value={cantidad}
                  onChange={handleInputChange(setCantidad)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  className={`form-control ${errorDescripcion ? "is-invalid" : ""}`}
                  rows="3"
                  value={descripcion}
                  onChange={handleInputChange(setDescripcion)}
                  required
                ></textarea>
                {errorDescripcion && (
                  <div className="invalid-feedback">{errorDescripcion}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Fecha de solicitud</label>
                <input
                  type="date"
                  className="form-control"
                  value={fecha}
                  onChange={handleInputChange(setFecha)}
                  max={fechaMax}
                  required
                />
              </div>

              <div className="text-end">
                <button type="button" className="btn btn-secondary me-2" onClick={handleClose}>
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
  );
};

export default SolicitudesForm;
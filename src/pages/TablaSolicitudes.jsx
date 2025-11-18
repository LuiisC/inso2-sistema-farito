import { useEffect, useState } from "react";
import axios from "axios";

const TablaSolicitudes = () => {
  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Estados para modales
  const [modalConfirm, setModalConfirm] = useState({
    visible: false,
    id: null,
    accion: "",
  });
  const [modalInfo, setModalInfo] = useState({ visible: false, info: null });

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/solicitudes");
        setData(response.data);
      } catch (err) {
        console.error("Error al obtener las solicitudes:", err);
        setError("Error al cargar las solicitudes");
      } finally {
        setCargando(false);
      }
    };
    fetchSolicitudes();
  }, []);

  // Función para cambiar estado
  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await axios.put(`http://localhost:3000/solicitudes/${id}/estado`, {
        estado: nuevoEstado,
      });
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, estado: nuevoEstado } : item
        )
      );
      setModalConfirm({ visible: false, id: null, accion: "" });
    } catch (error) {
      console.error(`Error al cambiar estado de la solicitud ${id}:`, error);
    }
  };

    
  const handleCloseConfirm = () => {
    setModalConfirm({ visible: false, id: null, accion: "" });
  };

  // Más info
  const handleMasInfo = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/solicitudes/${id}`
      );
      setModalInfo({ visible: true, info: response.data });
    } catch (error) {
      console.error("Error al obtener detalles de la solicitud:", error);
    }
  };

  const handleCloseInfo = () => {
    setModalInfo({ visible: false, info: null });
  };

  if (cargando) return <p>Cargando solicitudes...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <table className="table table-hover table-bordered">
        <thead className="table-primary">
          <tr>
            <th className="col-2">ID</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Fecha de pedido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const estado = row.estado;
            return (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.descripcion}</td>
                <td>{estado}</td>
                <td>
                  {new Date(row.fechaReparacion).toLocaleDateString("es-ES")}
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleMasInfo(row.id)}
                  >
                    <i className="bi bi-info-circle me-1"></i>Más info
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal Confirmación */}
      {modalConfirm.visible && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmación</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseConfirm}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  ¿Desea {modalConfirm.accion.toLowerCase()} la solicitud con ID{" "}
                  {modalConfirm.id}?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseConfirm}
                >
                  Cancelar
                </button>
                <button
                  className={`btn ${
                    modalConfirm.accion === "Aprobado"
                      ? "btn-success"
                      : "btn-danger"
                  }`}
                  onClick={() =>
                    cambiarEstado(modalConfirm.id, modalConfirm.accion)
                  }
                >
                  {modalConfirm.accion}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Más Info */}
      {modalInfo.visible && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalles de la Solicitud</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseInfo}
                ></button>
              </div>
              <div className="modal-body">
                <table className="table table-bordered">
                  <tbody>
                    {Object.entries(modalInfo.info).map(([key, value]) => (
                      <tr key={key}>
                        <th style={{ width: "30%" }}>{key}</th>
                        <td>
                          {key.toLowerCase().includes("fecha")
                            ? new Date(value).toLocaleDateString("es-ES")
                            : value?.toString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseInfo}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fondo modal */}
      {(modalConfirm.visible || modalInfo.visible) && (
        <div className="modal-backdrop fade show"></div>
      )}
    </div>
  );
};

export default TablaSolicitudes;
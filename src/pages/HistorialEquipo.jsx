import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Arrow from "../components/arrow_back_40.svg";

const API = "http://localhost:3000/reparaciones";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

const HistorialEquipo = () => {
  const qs = useQuery();
  const codigo = (qs.get("codigo") || "").trim();

  const [info, setInfo] = useState(null); // { codigo, equipo, total, items }
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [ok, setOk] = useState(null); // null | true | false

  useEffect(() => {
    if (!codigo) {
      setMensaje("Debe indicar un código de equipo en la URL.");
      setOk(false);
      return;
    }
    const fetchHistorial = async () => {
      setLoading(true);
      setMensaje("");
      setOk(null);
      try {
        const res = await fetch(
          `${API}/historial?codigo=${encodeURIComponent(codigo)}`,
          {
            cache: "no-store",
          }
        );
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        if (!res.ok) {
          const raw = data?.message ?? text ?? "Error consultando historial";
          const msg = Array.isArray(raw) ? raw.join(", ") : String(raw);
          setMensaje(msg);
          setOk(false);
          setInfo(null);
          return;
        }

        setInfo(data);
        setOk(true);
      } catch {
        setMensaje("Error de conexión con el servidor");
        setOk(false);
        setInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, [codigo]);

  const estadoActual = useMemo(() => {
    if (!info?.items?.length) return "-";
    return info.items[0]?.estado || "-";
  }, [info]);

  const equipo = info?.equipo || null;
  const esComputadora = equipo?.tipo === "computadora";
  const esImpresora = equipo?.tipo === "impresora";

  return (
    <>
      <h2 className="text-center">Historial Equipo</h2>

      <div className="d-flex align-items-center pb-2">
        <Link to="/registro">
          <img src={Arrow} alt="Regresar" className="p-1 bg-white rounded-2" />
        </Link>
        <h4 className="text-white p-2">Registro</h4>
      </div>

      {mensaje && (
        <div
          className={`alert ${ok === false ? "alert-danger" : "alert-success"}`}
        >
          {mensaje}
        </div>
      )}

      <div className="col-md-6 mb-3">
        <div className="card p-3">
          <h5>Información</h5>

          {/* Comunes */}
          <p>
            <strong>Código:</strong> {equipo?.codigo || codigo || "-"}
          </p>
          <p>
            <strong>Tipo:</strong>{" "}
            {equipo?.tipo
              ? equipo.tipo === "computadora"
                ? "Computadora"
                : "Impresora"
              : "-"}
          </p>

          <p>
            <strong>Estado actual:</strong> {estadoActual}
          </p>

          {/* Específicas por tipo */}
          {esComputadora && (
            <>
              <p>
                <strong>Marca:</strong> {equipo?.marca || "-"}
              </p>
              <p>
                <strong>Procesador:</strong> {equipo.procesador || "-"}
              </p>
              <p>
                <strong>Tipo de almacenamiento:</strong>{" "}
                {equipo.tipoAlmacenamiento || "-"}
              </p>
              <p>
                <strong>RAM:</strong> {equipo.ram || "-"}
              </p>
              <p>
                <strong>Sistema Operativo:</strong>{" "}
                {equipo.sistemaOperativo || "-"}
              </p>
            </>
          )}

          {esImpresora && (
            <>
              <p>
                <strong>Modelo:</strong> {equipo.modelo || "-"}
              </p>
              <p>
                <strong>Tipo de impresora:</strong>{" "}
                {equipo.tipoImpresora || "-"}
              </p>
              <p>
                <strong>Conectividad:</strong> {equipo.conectividad || "-"}
              </p>
              <p>
                <strong>Compatibilidad:</strong> {equipo.compatibilidad || "-"}
              </p>
              <p>
                <strong>Software/Driver:</strong>{" "}
                {equipo.software_o_driver || "-"}
              </p>
              <p>
                <strong>Departamento:</strong> {equipo.departamento || "-"}
              </p>
            </>
          )}
        </div>
      </div>

      {loading ? (
        <p>Cargando historial…</p>
      ) : info?.items?.length ? (
        <table className="table table-hover table-bordered">
          <thead className="table-primary">
            <tr>
              <th scope="col">Código Reparación</th>
              <th scope="col">Fecha de falla</th>
              <th scope="col">Tipo de evento</th>
              <th scope="col">Descripción del problema</th>
              <th scope="col">Fecha de reparación</th>
              <th scope="col">Acciones realizadas</th>
              <th scope="col">Técnico</th>
            </tr>
          </thead>
          <tbody>
            {info.items.map((r) => (
              <tr key={r.codigoReparacion}>
                <td>{r.codigoReparacion}</td>
                <td>{r.fechaRegistro || ""}</td>
                <td>{r.tipoEvento || ""}</td>
                <td>{r.descripcionProblema || ""}</td>
                <td>{r.fechaReparacion || ""}</td>
                <td>{r.accionesRealizadas || ""}</td>
                <td>{r.tecnico || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : ok === true ? (
        <p>No hay reparaciones registradas para este equipo.</p>
      ) : null}
    </>
  );
};

export default HistorialEquipo;

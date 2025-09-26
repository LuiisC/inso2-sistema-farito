import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const API = "http://localhost:3000/equipos";

const RegistrarNuevo = ({ show, handleClose }) => {
  const [tipoEquipo, setTipoEquipo] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [ok, setOk] = useState(null); // null | true | false

  // ---- Campos Computadora ----
  const [marca, setMarca] = useState("");
  const [procesador, setProcesador] = useState("");
  const [tipoAlmacenamiento, setTipoAlmacenamiento] = useState("");
  const [ram, setRam] = useState("");
  const [so, setSo] = useState("");

  // ---- Campos Impresora ----
  const [modelo, setModelo] = useState("");
  const [tipoImp, setTipoImp] = useState(""); // enum: laser | inyeccion (ajústalo a tus valores)
  const [departamento, setDepartamento] = useState("");
  const [marcaimp, setMarcaimp] = useState("");
  const [software, setSoftware] = useState("");
  const [compatibilidad, setCompatibilidad] = useState("");
  const [conectividad, setConectividad] = useState("");

  const limpiar = () => {
    setTipoEquipo("");
    setMarca("");
    setProcesador("");
    setTipoAlmacenamiento("");
    setRam("");
    setSo("");
    setModelo("");
    setTipoImp("");
    setDepartamento("");
    setMarcaimp("");
    setSoftware("");
    setCompatibilidad("");
    setConectividad("");
    setMensaje("");
    setOk(null);
  };

  const onHide = () => {
    limpiar();
    handleClose();
  };

  const handleRegistrar = async () => {
    setMensaje("");
    setOk(null);

    try {
      setGuardando(true);

      if (tipoEquipo === "computadora") {
        // Validaciones mínimas
        if (!marca || !procesador || !tipoAlmacenamiento || !ram || !so) {
          setMensaje("Complete todos los campos de computadora.");
          setOk(false);
          return;
        }

        const payload = {
          marca,
          procesador,
          tipoAlmacenamiento,
          ram,
          sistemaOperativo: so,
        };

        const res = await fetch(`${API}/computadora`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        if (!res.ok) {
          const raw = data?.message ?? text ?? "Error al registrar computadora";
          const msg = Array.isArray(raw) ? raw.join(", ") : String(raw);
          setMensaje(msg);
          setOk(false);
          return;
        }

        // Backend devuelve la computadora con "codigo" generado
        setMensaje(`Computadora registrada. Código: ${data.codigo}`);
        setOk(true);
        // Si querés cerrar automáticamente el modal:
        // setTimeout(onHide, 1200);
      } else if (tipoEquipo === "impresora") {
        // Validaciones mínimas
        if (
          !modelo ||
          !tipoImp ||
          !marcaimp ||
          !software ||
          !compatibilidad ||
          !conectividad
        ) {
          setMensaje(
            "Complete todos los campos de impresora (departamento es opcional)."
          );
          setOk(false);
          return;
        }

        // Ajusta valores del enum a lo que espera tu backend (ej.: 'laser', 'inyeccion')
        const payload = {
          modelo,
          tipo: tipoImp, // 'laser' | 'inyeccion' (ajústalo a tu enum real)
          departamento: departamento || undefined,
          marca: marcaimp,
          software_o_driver: software,
          compatibilidad,
          conectividad,
        };

        const res = await fetch(`${API}/impresora`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        if (!res.ok) {
          const raw = data?.message ?? text ?? "Error al registrar impresora";
          const msg = Array.isArray(raw) ? raw.join(", ") : String(raw);
          setMensaje(msg);
          setOk(false);
          return;
        }

        // Backend devuelve la impresora con "codigo" generado
        setMensaje(`Impresora registrada. Código: ${data.codigo}`);
        setOk(true);
        // Si querés cerrar automáticamente el modal:
        // setTimeout(onHide, 1200);
      } else {
        setMensaje("Seleccione el tipo de equipo.");
        setOk(false);
      }
    } catch (e) {
      setMensaje("Error de conexión con el servidor.");
      setOk(false);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-white text-black">
        <Modal.Title>Registrar nuevo equipo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {mensaje !== "" && (
          <div
            className={`alert ${
              ok === false ? "alert-danger" : "alert-success"
            }`}
          >
            {mensaje}
          </div>
        )}

        <Form>
          <Form.Group>
            <Form.Label>Tipo de equipo</Form.Label>
            <Form.Select
              value={tipoEquipo}
              onChange={(e) => {
                setTipoEquipo(e.target.value);
                setMensaje("");
                setOk(null);
              }}
            >
              <option value="">-- Seleccionar --</option>
              <option value="computadora">Computadora</option>
              <option value="impresora">Impresora</option>
            </Form.Select>
          </Form.Group>

          {/* computadorA */}
          {tipoEquipo === "computadora" && (
            <>
              <div className="row mt-3">
                <Form.Group className="col-md-6">
                  <Form.Label>Marca</Form.Label>
                  <Form.Select
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                  >
                    <option value="" disabled>
                      Seleccione
                    </option>
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Banghó">Banghó</option>
                    <option value="EXO">EXO</option>
                    <option value="PCBOX">PCBOX</option>
                    <option value="NSX">NSX</option>
                    <option value="Otra">Otra</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="col-md-6">
                  <Form.Label>Procesador CPU</Form.Label>
                  <Form.Control
                    placeholder="Ej: Intel Core i7-1355U"
                    value={procesador}
                    onChange={(e) => setProcesador(e.target.value)}
                  />
                </Form.Group>
              </div>

              <Form.Group className="mt-3">
                <Form.Label>Tipo de Almacenamiento</Form.Label>
                <Form.Control
                  placeholder="Ej: SSFD 512GB"
                  value={tipoAlmacenamiento}
                  onChange={(e) => setTipoAlmacenamiento(e.target.value)}
                />
              </Form.Group>

              <div className="row mt-3">
                <Form.Group className="col-md-6">
                  <Form.Label>RAM</Form.Label>
                  <Form.Select
                    value={ram}
                    onChange={(e) => setRam(e.target.value)}
                  >
                    <option value="" disabled>
                      Seleccione
                    </option>
                    <option value="4GB">4GB</option>
                    <option value="8GB">8GB</option>
                    <option value="16GB">16GB</option>
                    <option value="32GB">32GB</option>
                    <option value="64GB">64GB</option>
                    <option value="otro">otro</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="col-md-6">
                  <Form.Label>Sistema Operativo</Form.Label>
                  <Form.Select
                    value={so}
                    onChange={(e) => setSo(e.target.value)}
                  >
                    <option value="" disabled>
                      Seleccione
                    </option>
                    <option value="Windows 10">Windows 10</option>
                    <option value="Windows 11">Windows 11</option>
                    <option value="otro">otro</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </>
          )}

          {/* impresorA */}
          {tipoEquipo === "impresora" && (
            <>
              <div className="row mt-3">
                <Form.Group className="col-md-6">
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control
                    placeholder="Ej: LaserJet 1020"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="col-md-6">
                  <Form.Label>Marca</Form.Label>
                  <Form.Select
                    value={marcaimp}
                    onChange={(e) => setMarcaimp(e.target.value)}
                  >
                    <option value="" disabled>
                      Seleccione
                    </option>
                    <option value="HP">HP</option>
                    <option value="Epson">Epson</option>
                    <option value="Canon">Canon</option>
                    <option value="Brother">Brother</option>
                    <option value="Otra">Otra</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="row mt-3">
                <Form.Group className="col-md-6">
                  <Form.Label>Tipo de Impresora</Form.Label>
                  <Form.Select
                    value={tipoImp}
                    onChange={(e) => setTipoImp(e.target.value)}
                  >
                    <option value="" disabled>
                      Seleccione
                    </option>
                    <option value="Laser">Láser</option>
                    <option value="Inyeccion">Inyección</option>
                    <option value="Termica">Térmica</option>
                    <option value="Matricial">Matriz de puntos</option>
                    <option value="Continua">Continua</option>
                    <option value="Otro">Otro</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="col-md-6">
                  <Form.Label>Departamento (opcional)</Form.Label>
                  <Form.Control
                    placeholder="Ej: Contabilidad"
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                  />
                </Form.Group>
              </div>

              <Form.Group className="mt-3">
                <Form.Label>Software o driver</Form.Label>
                <Form.Control
                  placeholder="Ej: PCL, herramientas de escaneo..."
                  value={software}
                  onChange={(e) => setSoftware(e.target.value)}
                />
              </Form.Group>

              <div className="row mt-3">
                <Form.Group className="col-md-6">
                  <Form.Label>Compatibilidad</Form.Label>
                  <Form.Select
                    value={compatibilidad}
                    onChange={(e) => setCompatibilidad(e.target.value)}
                  >
                    <option value="" disabled>
                      Seleccione
                    </option>
                    <option value="Windows 10">Windows 10</option>
                    <option value="Windows 11">Windows 11</option>
                    <option value="macOS">macOS</option>
                    <option value="Linux">Linux</option>
                    <option value="otro">otro</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="col-md-6">
                  <Form.Label>Conectividad</Form.Label>
                  <Form.Control
                    placeholder="Ej: Wi-Fi, USB, Bluetooth..."
                    value={conectividad}
                    onChange={(e) => setConectividad(e.target.value)}
                  />
                </Form.Group>
              </div>
            </>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={guardando}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleRegistrar}
          disabled={guardando || !tipoEquipo}
        >
          {guardando ? "Registrando..." : "Registrar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistrarNuevo;

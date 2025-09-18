import { useState } from "react";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";

const RegistrarNuevo = ({ show, handleClose }) => {
  const [tipoEquipo, setTipoEquipo] = useState("");

  const handleChange = (e) => setTipoEquipo(e.target.value);

  const [marca, setMarca] = useState("");
  const [ram, setRam] = useState("");
  const [so, setSo] = useState("");
  const [marcaimp, setMarcaimp] = useState("");
  const [compatibilidad, setCompatibilidad] = useState("");

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-white text-black">
        <Modal.Title>Registrar nuevo equipo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tipo de equipo</Form.Label>
            <Form.Select value={tipoEquipo} onChange={handleChange}>
              <option value="">-- Seleccionar --</option>
              <option value="computadora">Computadora</option>
              <option value="impresora">Impresora</option>
            </Form.Select>
          </Form.Group>

          {/* formulario de computadora */}
          {tipoEquipo === "computadora" && (
            <>
              <div className="row mt-3">
                <Form.Group className="col-md-6">
                  <Form.Label>Código</Form.Label>
                  <Form.Control placeholder="Ej: C-001" />
                </Form.Group>

                <Form.Group className="col-md-6">
                  <Form.Label>Marca</Form.Label>
                  <Form.Select value={marca} onChange={(e) => setMarca(e.target.value)}>
                    <option value=" " disabled>Seleccione</option>
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
              </div>

              <Form.Group className="md-3">
                <Form.Label>Procesador CPU</Form.Label>
                <Form.Control placeholder="Ej: Core I7-1355U" />
              </Form.Group>

              <Form.Group className="md-4">
                <Form.Label>Tipo de Almacenamiento</Form.Label>
                <Form.Control placeholder="Ej: 512 GB SSD" />
              </Form.Group>

              <div className="row mt-3">
                <Form.Group className="col-md-6">
                  <Form.Label>RAM</Form.Label>
                    <Form.Select value={ram} onChange={(e) => setRam(e.target.value)}>
                      <option value="" disabled>Seleccione</option>
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
                    <Form.Select value={so} onChange={(e) => setSo(e.target.value)}>
                      <option value="" disabled>Seleccione</option>
                      <option value="Windows 10">Windows 10</option>
                      <option value="Windows 11">Windows 11</option>
                      <option value="otro">otro</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </>
          )}

          {/* formulario de impresora */}
          {tipoEquipo === "impresora" && (
            <>
              <div className="row mt-3">
                <Form.Group className="col-md-6">
                  <Form.Label>Código</Form.Label>
                  <Form.Control placeholder="Ej: I-001" />
                </Form.Group>

                <Form.Group className="col-md-6">
                  <Form.Label>Marca</Form.Label>
                  <Form.Select value={marcaimp} onChange={(e) => setMarcaimp(e.target.value)}>
                    <option value=" " disabled>Seleccione</option>
                    <option value="HP">HP</option>
                    <option value="Epson">Epson</option>
                    <option value="Canon">Canon</option>
                    <option value="Brother">Brother</option>
                    <option value="Otra">Otra</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <Form.Group className="md-3">
                <Form.Label>Tipo de Impresora</Form.Label>
                <Form.Control placeholder="Ej: Láser, Inyeccion de tinta ..." />
              </Form.Group>

              <Form.Group className="md-4">
                <Form.Label>Software o driver</Form.Label>
                <Form.Control placeholder="Ej: PCL,herramientas de diagnóstico, escaneo ..." />
              </Form.Group>

              <div className="row mt-3">
                <Form.Group className="col-md-6">
                  <Form.Label>Compatibilidad</Form.Label>
                    <Form.Select value={compatibilidad} onChange={(e) => setCompatibilidad(e.target.value)}>
                      <option value="" disabled>Seleccione</option>
                      <option value="Windows 10">Windows 10</option>
                      <option value="Windows 11">Windows 11</option>
                      <option value="macOS">macOs</option>
                      <option value="Linux">Linux</option>
                      <option value="otro">otro</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="col-md-6">
                  <Form.Label>Conectividad</Form.Label>
                  <Form.Control placeholder="Ej: Wi-Fe, USB, Bluetooth ..." />    
                </Form.Group>
              </div>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => alert("Registrado")}>
          Registrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistrarNuevo;

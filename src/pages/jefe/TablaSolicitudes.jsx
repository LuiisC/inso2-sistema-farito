import { useState } from "react";

function TablaSolicitudes({onRowClick, searchQuery}) {
    // Datos de ejemplo, estos vendríandel backend
  const data = [
    { idSolicitud: '01', descripcion: 'Problema con impresora', tecnico: 'Juan Perez' , estado: 'Pendiente', fechaPedido: '15-05-2025'},
    { idSolicitud: '02', descripcion: 'Cambio de almacenamiento', tecnico: 'Luis Martinez', estado: 'Pendiente', fechaPedido: '18-05-2025'},
    { idSolicitud: '03', descripcion: 'Cambio de RAM', tecnico: 'Andres Leon', estado: 'Pendiente', fechaPedido: '16-05-2025'},
    { idSolicitud: '04', descripcion: 'Formateo', tecnico: 'Miguel Tello', estado: 'Pendiente', fechaPedido: '10-05-2025' },
  ];


  return (
    <div>
        <table className="table table-hover table-bordered">
            <thead className="table-primary">
                <tr>
                    <th className="col-2" scope="col">ID</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Técnico</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Fecha de pedido</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr>
                      <td>{row.idSolicitud}</td>
                      <td>{row.descripcion}</td>
                      <td>{row.tecnico}</td>
                      <td>{row.estado}</td>
                      <td>{row.fechaPedido}</td>
                    </tr>
                ))}
            </tbody>
          </table>
    </div>
  );
}

export default TablaSolicitudes
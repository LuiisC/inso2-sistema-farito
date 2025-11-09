import { useState } from "react";

function TablaSolicitudes({ onRowClick, searchQuery }) {
  // Datos de ejemplo, estos vendríandel backend
  const data = [
    {
      id_solicitud: "11",
      descripcion: "Cambio de almacenamiento",
      estado: "Pendiente",
      fecha_solicitud: "05/11/2025",
    },
    {
      id_solicitud: "3",
      descripcion: "Impresora",
      estado: "Aprobado",
      fecha_solicitud: "22/10/2025",
    },
    {
      id_solicitud: "7",
      descripcion: "Computadora",
      estado: "Aprobado",
      fecha_solicitud: "20/10/2025",
    },
    {
      id_solicitud: "1",
      descripcion: "Impresora",
      estado: "Pendiente",
      fecha_solicitud: "20/10/2025",
    },
    {
      id_solicitud: "5",
      descripcion: "Computadora",
      estado: "Pendiente",
      fecha_solicitud: "20/10/2025",
    },
  ];

  const equiposFiltrados = data.filter((item) =>
    item.id_solicitud.includes(searchQuery)
  );

  return (
    <div>
      <table className="table table-hover table-bordered">
        <thead className="table-primary">
          <tr>
            <th className="col-2" scope="col">
              Id
            </th>
            <th scope="col">Descripcion</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {equiposFiltrados.map((row) => (
            <tr
              key={row.id_solicitud}
              onClick={() => onRowClick(row.id_solicitud)}
            >
              <td>{row.id_solicitud}</td>
              <td>{row.descripcion}</td>
              <td>{row.estado}</td>
              <td>{row.fecha_solicitud}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaSolicitudes;

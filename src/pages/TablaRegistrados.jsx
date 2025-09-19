import { useState } from "react";

function TablaRegistrados({onRowClick}) {
    // Datos de ejemplo, estos vendríandel backend
  const data = [
    { cod_equipo: 'PC-11', tipo: 'Computadora', estado: 'En reparación' , departamento: 'RRHH'},
    { cod_equipo: 'I-03', tipo: 'Impresora', estado: 'Reparado', departamento: 'Contable' },
    { cod_equipo: 'PC-07', tipo: 'Computadora', estado: 'Reparado', departamento: 'Soporte técnico' },
    { cod_equipo: 'I-01', tipo: 'Impresora', estado: 'En reparación', departamento: 'Soporte técnico' },
    { cod_equipo: 'PC-05', tipo: 'Computadora', estado: 'En reparación', departamento: 'Soporte técnico' },
    { cod_equipo: 'PC-09', tipo: 'Computadora', estado: 'Reparado', departamento: 'Contable' }
  ];
  return (
    <div>
        <table className="table table-hover table-bordered">
            <thead className="table-primary">
                <tr>
                    <th className="col-2" scope="col">Cod. Equipo</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Departamento</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row.cod_equipo} onClick={() => onRowClick(row.cod_equipo)}>
                        <td>{row.cod_equipo}</td>
                        <td>{row.tipo}</td>
                        <td>{row.estado}</td>
                        <td>{row.departamento}</td>
                    </tr>
                ))}
            </tbody>
          </table>
    </div>
  );
}

export default TablaRegistrados
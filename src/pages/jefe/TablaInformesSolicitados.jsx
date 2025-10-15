import { useState } from "react";

function TablaInformesSolicitados({onRowClick, searchQuery}) {
    // Datos de ejemplo, estos vendríandel backend
  const data = [
    { objeto: 'Computadora', funAgregacion: 'Suma', tipoGrafico: 'Gráfico de barras' , fecha: '21-04-2024'},
    { objeto: 'Impresora', funAgregacion: 'Conteo', tipoGrafico: 'Tabla', fecha: '22-06-2025' },
    { objeto: 'Computadora', funAgregacion: 'Mediana', tipoGrafico: 'Gráfico de barras', fecha: '04-12-2023' },
    { objeto: 'Impresora', funAgregacion: 'Conteo', tipoGrafico: 'Gráfico de barras', fecha: '15-08-2024' },
    { objeto: 'Computadora', funAgregacion: 'Promedio', tipoGrafico: 'Gráfico de barras', fecha: '21-04-2025' },
  ];


  return (
    <div>
        <table className="table table-hover table-bordered">
            <thead className="table-primary">
                <tr>
                    <th className="col-2" scope="col">Objeto</th>
                    <th scope="col">Función de agregación</th>
                    <th scope="col">Tipo de gráfico</th>
                    <th scope="col">Fecha de solicitud</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr>
                        <td>{row.objeto}</td>
                        <td>{row.funAgregacion}</td>
                        <td>{row.tipoGrafico}</td>
                        <td>{row.fecha}</td>
                    </tr>
                ))}
            </tbody>
          </table>
    </div>
  );
}

export default TablaInformesSolicitados
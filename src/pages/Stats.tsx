import "../styles/Stats.scss";
import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const Stats = () => {
  const data = [
    { name: "John", email: "john@example.com", age: 28 },
    { name: "Jane", email: "jane@example.com", age: 32 },
    // ... more data
  ];

  const exportToExcel = (index: number) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Buffer to store the generated Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, "Query_" + index + ".xlsx");
  };

  const stats: string[] = [
    "Obtener los nombres y la posición geográfica de los aeropuertos que brinden servicio de reparación a las naves.",
    "Obtener la cantidad de reparaciones capitales que se han realizado en cada aeropuerto.",
    "Por tipo de cliente, obtener los nombres y el tipo de los clientes del aeropuerto internacional José Martí que han arribado a la misma en sus propias naves como capitanes.",
    "Obtener los nombres de los aeropuertos y la cantidad de servicios que brinda cada uno de ellos, para aquéllos que hayan recibido el menor número de naves después del año 2010.",
    "Obtener el monto promedio por cada uno de los servicios de reparación del aeropuerto internacional José Martí que han sido ineficientes en el último año transcurrido y cuya valoración por los clientes tenga un promedio menor a 5 puntos.",
  ];

  return (
    <>
      <div className="stats-container">
        <h1 className="page-header">Stats:</h1>
        <ol>
          {stats.map((stat, index) => (
            <div key={index}>
              <li>
                {stat}
                <div className="buttons-container">
                  <button
                    className="my-button query-button"
                    onClick={() => exportToExcel(index + 1)}
                  >
                    Query
                  </button>
                </div>
              </li>
            </div>
          ))}
        </ol>
      </div>
    </>
  );
};

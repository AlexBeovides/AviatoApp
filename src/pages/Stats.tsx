import "../styles/Stats.scss";
import { API_BASE_URL } from "../config";
import { useEffect, useState } from "react";

type Stat = {
  description: string;
  sqlQuery: string;
};

export const Stats = () => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_BASE_URL}/Planes/MyPlanes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const stats: Stat[] = [
    {
      description:
        "Obtener los nombres y la posición geográfica de los aeropuertos que brinden servicio de reparación a las naves.",
      sqlQuery: "",
    },
    {
      description:
        "Obtener la cantidad de reparaciones capitales que se han realizado en cada aeropuerto.",
      sqlQuery: "",
    },
    {
      description:
        "Por tipo de cliente, obtener los nombres y el tipo de los clientes del aeropuerto internacional José Martí que han arribado a la misma en sus propias naves como capitanes.",
      sqlQuery: "",
    },
    {
      description:
        "Obtener los nombres de los aeropuertos y la cantidad de servicios que brinda cada uno de ellos, para aquéllos que hayan recibido el menor número de naves después del año 2010.",
      sqlQuery: "",
    },
    {
      description:
        "Obtener el monto promedio por cada uno de los servicios de reparación del aeropuerto internacional José Martí que han sido ineficientes en el último año transcurrido y cuya valoración por los clientes tenga un promedio menor a 5 puntos.",
      sqlQuery: "",
    },
    {
      description:
        "Eliminar apropiadamente los servicios de un aeropuerto que hayan sido ineficientes.",
      sqlQuery: "",
    },
  ];

  return (
    <>
      <div className="stats-container">
        <h1 className="page-header">Stats:</h1>
        <ol>
          {stats.map((stat) => (
            <div>
              <li>
                {stat.description}
                <div className="buttons-container">
                  <button className="my-button query-button">Query</button>
                  <button className="my-button export-button disabled-button">
                    Export
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

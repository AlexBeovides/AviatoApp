import "../styles/Stats.scss";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { API_BASE_URL } from "../config";

export const Stats = () => {
  const [loading, setLoading] = useState(false);
  const [averageRepairCost, setAverageRepairCost] = useState("-");
  const token = localStorage.getItem("token");

  const stats = [
    "Repair Services",
    "Major Repairs Count",
    "Customers By Type",
    "Least Visited Since 2010",
    "Average Repair Cost",
  ];

  const endpoints = [
    `repairServices`,
    `majorRepairsCount`,
    `customersByType`,
    `leastVisitedSince2010`,
    `averageRepairCost`,
  ];

  const fetchData = async (index: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/Stats/${endpoints[index]}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (index == 4) setAverageRepairCost(data.averageCost);
      else exportToExcel(data, index + 1);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = (data: any[], index: number) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Sheet${index}`);
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(dataBlob, `Stats${index}.xlsx`);
  };

  return (
    <>
      <div className="stats-container">
        <h1 className="page-header">Stats:</h1>
        <ol>
          {stats.map((stat: string, index: number) => (
            <div key={index}>
              <li>
                {stat}
                <div className="buttons-container">
                  <button
                    className="my-button query-button"
                    onClick={() => fetchData(index)}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Query"}
                  </button>
                  <span className="average-repair-cost">
                    {index == 4 ? `${averageRepairCost}` : ` `}
                  </span>
                </div>
              </li>
            </div>
          ))}
        </ol>
      </div>
    </>
  );
};

import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import  { useState } from 'react';
import { ColDef } from 'ag-grid-community';

interface RowData {
  make: string;
  model: string;
  price: number;
}

export const Clients = () => {
  const [rowData] = useState<RowData[]>([
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
]);
const [colDefs, setColDefs] = useState<ColDef<RowData>[]>([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
]);

return (
  <>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
    <div className="ag-theme-quartz" style={{ height: 400, width: 600 }}>
        <AgGridReact<RowData>
            rowData={rowData}
            columnDefs={colDefs} />
    </div>
    </>
);
};
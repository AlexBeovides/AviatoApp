import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import  { useEffect,useState } from 'react';
import { ColDef } from 'ag-grid-community';

type Client = {
  id: number;
  name: string;
  nationality: string;
  clientType: string;
};

export const Clients = () => {

const [rowData, setRowData] = useState<Client[]>([]);
const [colDefs] = useState<ColDef[]>([
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name' },
  { field: 'nationality', headerName: 'Nationality' },
  { field: 'clientType', headerName: 'Client Type' },
]);

useEffect(() => {
  fetch('https://localhost:32770/api/Clients')
    .then(response => response.json())
    .then(data => setRowData(data))
    .catch(error => console.error('Error:', error));
}, []);

return (
  <>
    <h2 style={{ marginLeft: '30px',marginTop: '15vh',marginBottom:'30px' }}>Clients Data:</h2>

    <div className="ag-theme-quartz" style={{ height: 400, width: 800, marginLeft: '30px',marginBottom: '10vh' }}>
        <AgGridReact<Client>
            rowData={rowData}
            columnDefs={colDefs} />
    </div>
  </>
);
};
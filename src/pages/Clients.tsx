import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import  { useEffect,useState } from 'react';
import { ColDef,CellValueChangedEvent } from 'ag-grid-community';

type Client = {
  id: number;
  name: string;
  nationality: string;
  clientType: string;
};

export const Clients = () => {

const [rowData, setRowData] = useState<Client[]>([]);
const [colDefs] = useState<ColDef[]>([
  { field: 'id', headerName: 'ID', editable: false },
  { field: 'name', headerName: 'Name', editable: true },
  { field: 'nationality', headerName: 'Nationality', editable: true },
  { field: 'clientType', headerName: 'Client Type', editable: true },
]);

const onCellValueChanged = (params : CellValueChangedEvent) => {
  const updatedClient = params.data;

  fetch(`https://localhost:32770/api/Clients/${updatedClient.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedClient),
  })
    .catch(error => console.error('Error:', error));
};

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
            columnDefs={colDefs} 
            onCellValueChanged={onCellValueChanged}
          />
    </div>
  </>
);
};
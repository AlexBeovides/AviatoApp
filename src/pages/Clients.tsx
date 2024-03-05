import '../styles/Clients.scss';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from 'react';
import { ColDef, CellValueChangedEvent, GridReadyEvent, GridApi,RowSelectedEvent } from 'ag-grid-community';


type Client = {
  id: number;
  name: string;
  nationality: string;
  clientType: string;
};

export const Clients = () => {
  const [rowData, setRowData] = useState<Client[]>([]);
  const [selectedRows, setSelectedRows] = useState<Client[]>([]);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', editable: false, checkboxSelection: true },
    { field: 'name', headerName: 'Name', editable: true },
    { field: 'nationality', headerName: 'Nationality', editable: true , filter: true, floatingFilter: true },
    { field: 'clientType', headerName: 'Client Type', editable: true, filter: true, floatingFilter: true },
  ];

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      setSelectedRows(gridApi.getSelectedRows());
    }
  };

  const deleteSelectedRows = () => {
    selectedRows.forEach(row => {
      fetch(`https://localhost:32770/api/Clients/${row.id}`, {
        method: 'DELETE',
      })
      .catch(error => console.error('Error:', error));
    });

    setRowData(rowData.filter(row => !selectedRows.includes(row)));
    setSelectedRows([]);
  };

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
    <h2 className='page-header'>Clients Data:</h2>
    <button className='delete-button' onClick={deleteSelectedRows}>Delete Selected Rows</button>
    <div className="ag-theme-quartz" style={{ height: 400, width: 800, marginLeft: '30px',marginBottom: '10vh' }}>
        <AgGridReact<Client>
            rowData={rowData}
            columnDefs={colDefs} 
            onCellValueChanged={onCellValueChanged}
            onGridReady={onGridReady}
            onSelectionChanged={onSelectionChanged}
            rowSelection="multiple"
          />
    </div>
  </>
);
};
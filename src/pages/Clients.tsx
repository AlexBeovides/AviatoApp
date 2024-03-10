import '../styles/Clients.scss';
import { API_BASE_URL } from '../config';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from 'react';
import { ColDef, CellValueChangedEvent, GridReadyEvent, GridApi } from 'ag-grid-community';

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
  const [newClient, setNewClient] = useState<Client>({ id: 0, name: '', nationality: '', clientType: '' });

  const colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', editable: false, checkboxSelection: true },
    { field: 'name', headerName: 'Name', editable: true },
    { field: 'nationality', headerName: 'Nationality', editable: true , filter: true, floatingFilter: true },
    { field: 'clientType', headerName: 'Client Type', editable: true, filter: true, floatingFilter: true },
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewClient({ ...newClient, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    fetch(`${API_BASE_URL}/Clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClient),
    })
    .then(response => response.json())
    .then(data => setRowData([...rowData, data]))
    .catch(error => console.error('Error:', error));
  };

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      setSelectedRows(gridApi.getSelectedRows());
    }
  };

  const deleteSelectedRows = () => {
    if (window.confirm('Are you sure you want to delete the selected rows?')) {
      selectedRows.forEach(row => {
        fetch(`${API_BASE_URL}/Clients/${row.id}`, {
          method: 'DELETE',
        })
        .catch(error => console.error('Error:', error));
      });
  
      setRowData(rowData.filter(row => !selectedRows.includes(row)));
      setSelectedRows([]);
    }
  };

const onCellValueChanged = (params : CellValueChangedEvent) => {
  const updatedClient = params.data;

  fetch(`${API_BASE_URL}/Clients/${updatedClient.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedClient),
  })
    .catch(error => console.error('Error:', error));
};

useEffect(() => {
  fetch(`${API_BASE_URL}/Clients`)
    .then(response => response.json())
    .then(data => setRowData(data))
    .catch(error => console.error('Error:', error));
}, []);

return (
  <>
    <h2 className='page-header'>Clients Data:</h2>
    <div className='section-container'>
      <div className='table-container'>
        <div className="ag-theme-quartz client-table" style={{ height: 400, width: 800 }}>
          <AgGridReact<Client>
            rowData={rowData}
              columnDefs={colDefs} 
              onCellValueChanged={onCellValueChanged}
              onGridReady={onGridReady}
              onSelectionChanged={onSelectionChanged}
              rowSelection="multiple"
            />
        </div>
      <button className='my-button delete-button' onClick={deleteSelectedRows}>Delete Selected Rows</button>
      </div>
      <form className="form-container" onSubmit={handleFormSubmit}>
        <input type="text" name="name" value={newClient.name} onChange={handleInputChange} placeholder="Name" required />
        <input type="text" name="nationality" value={newClient.nationality} onChange={handleInputChange} placeholder="Nationality" required />
        <input type="text" name="clientType" value={newClient.clientType} onChange={handleInputChange} placeholder="Client Type" required />
        <button className='my-button' type="submit">Add New Client</button>
      </form>
    </div>
  </>
);
};
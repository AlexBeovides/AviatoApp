import '../styles/Manager.scss';
import { API_BASE_URL } from '../config';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from 'react';
import { ColDef, CellValueChangedEvent, GridReadyEvent, GridApi } from 'ag-grid-community';

type Client = {
    id: string;
    email: string;
    name: string;
    surname: string;
    country: string;
    clientTypeId: number | null
    isDeleted:boolean;
    password:string;
};   

export const ClientsManager = () => {
  const [rowData, setRowData] = useState<Client[]>([]);
  const [selectedRows, setSelectedRows] = useState<Client[]>([]);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [newClient, setNewClient] = useState<Client>({ id: '', email: '', name: '', surname: '', country: '', clientTypeId: null, isDeleted: false, password: '' });

  const token = localStorage.getItem('token');

  const colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', editable: false, checkboxSelection: true },
    { field: 'isDeleted', headerName: 'Deleted', editable: true, filter:true , cellRenderer: (params: CellValueChangedEvent) => params.value ? 'true' : 'false' },
    { field: 'clientTypeId', headerName: 'Client Type ID', editable: true ,filter:true },
    { field: 'email', headerName: 'Email', editable: true },
    { field: 'name', headerName: 'Name', editable: true },
    { field: 'surname', headerName: 'Surname', editable: true },
    { field: 'country', headerName: 'Country', editable: true , filter:true},
  ];

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewClient({ ...newClient, [event.target.name]: event.target.value });
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      setSelectedRows(gridApi.getSelectedRows());
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/Clients`)
      .then(response => response.json())
      .then(data => {console.log('Response:', data); setRowData(data);})
      .catch(error => console.error('Error:', error));
  }, []);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    fetch(`${API_BASE_URL}/Clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newClient),
    })
    .then(() => fetch(`${API_BASE_URL}/Clients`))
    .then(response => response.json())
    .then(data => setRowData(data))
    .catch(error => console.error('Error:', error));
  };
  
  const onCellValueChanged = (params : CellValueChangedEvent) => {
    const updatedClient = { ...params.data, password: 'password' };
  
    fetch(`${API_BASE_URL}/Clients/${updatedClient.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedClient),
    })
      .catch(error => console.error('Error:', error));
  };

  const deleteSelectedRows = () => {
    if (window.confirm('Are you sure you want to delete the selected rows?')) {
      Promise.all(selectedRows.map(row => 
        fetch(`${API_BASE_URL}/Clients/${row.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      ))
      .then(() => fetch(`${API_BASE_URL}/Clients`))
      .then(response => response.json())
      .then(data => setRowData(data))
      .catch(error => console.error('Error:', error));
  
      setSelectedRows([]);
    }
  };

  return (
    <>
      <h2 className='page-header'>Clients Data:</h2>
      <div className='section-container'>
        <div className='table-container'>
          <div className="ag-theme-quartz manager-table" style={{ height: 400, width: 800 }}>
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
          <input type="text" name="email" value={newClient.email} onChange={handleInputChange} placeholder="Email" required />
          <input type="text" name="password" value={newClient.password} onChange={handleInputChange} placeholder="Password" required />
          <input type="text" name="name" value={newClient.name} onChange={handleInputChange} placeholder="Name" required />
          <input type="text" name="surname" value={newClient.surname} onChange={handleInputChange} placeholder="Surname" required />
          <input type="text" name="country" value={newClient.country} onChange={handleInputChange} placeholder="Country" required />
          <input type="number" name="clientTypeId" value={newClient.clientTypeId || ''} onChange={handleInputChange} placeholder="Client Type ID" />
          <button className='my-button' type="submit">Add New Client</button>
        </form>
      </div>
    </>
  );
};
 
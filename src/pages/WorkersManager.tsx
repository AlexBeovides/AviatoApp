import '../styles/Manager.scss';
import { API_BASE_URL } from '../config';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from 'react';
import { ColDef, CellValueChangedEvent, GridReadyEvent, GridApi } from 'ag-grid-community';

type Worker = {
    id: string;
    email: string;
    name: string;
    surname: string;
    role:string;
    airportId: number | null
    isDeleted:boolean;
    password:string;
};   
export const WorkersManager = () => {
  const [rowData, setRowData] = useState<Worker[]>([]);
  const [selectedRows, setSelectedRows] = useState<Worker[]>([]);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [newWorker, setNewWorker] = useState<Worker>({ id: '', email: '', name: '', surname: '', role: '', airportId: null, isDeleted: false, password: '' });

  const token = localStorage.getItem('token');

  const colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', editable: false, checkboxSelection: true },
    { field: 'isDeleted', headerName: 'Deleted', editable: true, filter:true , cellRenderer: (params: CellValueChangedEvent) => params.value ? 'true' : 'false' },
    { field: 'airportId', headerName: 'Airport ID', editable: true ,filter:true },
    { field: 'email', headerName: 'Email', editable: true },
    { field: 'name', headerName: 'Name', editable: true },
    { field: 'surname', headerName: 'Surname', editable: true },
  ];

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewWorker({ ...newWorker, [event.target.name]: event.target.value });
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      setSelectedRows(gridApi.getSelectedRows());
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/Workers`)
      .then(response => response.json())
      .then(data => {console.log('Response:', data); setRowData(data);})
      .catch(error => console.error('Error:', error));
  }, []);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    fetch(`${API_BASE_URL}/Workers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newWorker),
    })
    .then(() => fetch(`${API_BASE_URL}/Workers`))
    .then(response => response.json())
    .then(data => setRowData(data))
    .catch(error => console.error('Error:', error));
  };
  
  const onCellValueChanged = (params : CellValueChangedEvent) => {
    const updatedWorker = { ...params.data, password: 'password' };
  
    fetch(`${API_BASE_URL}/Workers/${updatedWorker.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedWorker),
    })
      .catch(error => console.error('Error:', error));
  };

  const deleteSelectedRows = () => {
    if (window.confirm('Are you sure you want to delete the selected rows?')) {
      Promise.all(selectedRows.map(row => 
        fetch(`${API_BASE_URL}/Workers/${row.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      ))
      .then(() => fetch(`${API_BASE_URL}/Workers`))
      .then(response => response.json())
      .then(data => setRowData(data))
      .catch(error => console.error('Error:', error));
  
      setSelectedRows([]);
    }
  };

  return (
    <>
      <h2 className='page-header'>Workers Data:</h2>
      <div className='section-container'>
        <div className='table-container'>
          <div className="ag-theme-quartz manager-table" style={{ height: 400, width: 800 }}>
            <AgGridReact<Worker>
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
          <input type="text" name="email" value={newWorker.email} onChange={handleInputChange} placeholder="Email" required />
          <input type="text" name="password" value={newWorker.password} onChange={handleInputChange} placeholder="Password" required />
          <input type="text" name="name" value={newWorker.name} onChange={handleInputChange} placeholder="Name" required />
          <input type="text" name="surname" value={newWorker.surname} onChange={handleInputChange} placeholder="Surname" required />
          <input type="text" name="role" value={newWorker.role} onChange={handleInputChange} placeholder="Role" required />
          <input type="number" name="airportId" value={newWorker.airportId || ''} onChange={handleInputChange} placeholder="Airport ID" />
          <button className='my-button' type="submit">Add New Worker</button>
        </form>
      </div>
    </>
  );
};
 
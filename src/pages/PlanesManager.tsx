import '../styles/Manager.scss';
import { API_BASE_URL } from '../config';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from 'react';
import { ColDef, CellValueChangedEvent, GridReadyEvent, GridApi } from 'ag-grid-community';

type Plane = {
    id: number;
    ownerId: string;
    classification: string;
    crewCount: number  | null;
    passengerCapacity: number | null;
    cargoCapacity: number | null;
    isDeleted: boolean;
};  
 
export const PlanesManager = () => {
  const [rowData, setRowData] = useState<Plane[]>([]);
  const [selectedRows, setSelectedRows] = useState<Plane[]>([]);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [newPlane, setNewPlane] = useState<Plane>({  id: 0 , ownerId: '' , classification: ''  , 
  crewCount: null , passengerCapacity: null, cargoCapacity: null ,isDeleted: false });

  const token = localStorage.getItem('token');

  const colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', editable: false, checkboxSelection: true },
    { field: 'isDeleted', headerName: 'Deleted', editable: true ,  filter:true,
    cellRenderer: (params: CellValueChangedEvent) => params.value ? 'true' : 'false'},
    { field: 'ownerId', headerName: 'Owner ID', editable: true , filter: true},
    { field: 'classification', headerName: 'Classification', editable: true, filter: true },
    { field: 'crewCount', headerName: 'Crew Count', editable: true },
    { field: 'passengerCapacity', headerName: 'Passenger Capacity', editable: true },
    { field: 'cargoCapacity', headerName: 'Cargo Capacity', editable: true },
  ];

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewPlane({ ...newPlane, [event.target.name]: event.target.value });
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      setSelectedRows(gridApi.getSelectedRows());
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/Planes`)
      .then(response => response.json())
      .then(data => {console.log('Response:', data);setRowData(data);})
      .catch(error => console.error('Error:', error));
  }, []);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { id, ...planeDTO} = newPlane; 

    fetch(`${API_BASE_URL}/Planes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(planeDTO),
    })
    .then(response => response.json())
    .then(data => setRowData([...rowData, data]))
    .catch(error => console.error('Error:', error));
  };
  
  const onCellValueChanged = (params : CellValueChangedEvent) => {
    const updatedPlane = params.data;
  
    fetch(`${API_BASE_URL}/Planes/${updatedPlane.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedPlane),
    })
      .catch(error => console.error('Error:', error));
  };

  const deleteSelectedRows = () => {
    if (window.confirm('Are you sure you want to delete the selected rows?')) {
      Promise.all(selectedRows.map(row => 
        fetch(`${API_BASE_URL}/Planes/${row.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      ))
      .then(() => fetch(`${API_BASE_URL}/Planes`))
      .then(response => response.json())
      .then(data => setRowData(data))
      .catch(error => console.error('Error:', error));
  
      setSelectedRows([]);
    }
  };
  
  return (
    <>
      <h2 className='page-header'>Planes Data:</h2>
      <div className='section-container'>
        <div className='table-container'>
          <div className="ag-theme-quartz manager-table" style={{ height: 400, width: 800 }}>
            <AgGridReact<Plane>
              rowData={rowData}
              columnDefs={colDefs} 
              onCellValueChanged={onCellValueChanged}
              onGridReady={onGridReady}
              onSelectionChanged={onSelectionChanged}
              rowSelection="multiple"
              />
          </div>
        <button className='my-button delete-button' onClick={deleteSelectedRows}>Delete Selected Planes</button>
        </div>
        
        <form className="form-container" onSubmit={handleFormSubmit}>
          <input type="text" name="ownerId" value={newPlane.ownerId} onChange={handleInputChange} placeholder="Owner ID" required />
          <input type="text" name="classification" value={newPlane.classification} onChange={handleInputChange} placeholder="Classification" required />
          <input type="text" name="crewCount" value={newPlane.crewCount  || ''} onChange={handleInputChange} placeholder="Crew Count" required />
          <input type="text" name="passengerCapacity" value={newPlane.passengerCapacity  || ''} onChange={handleInputChange} placeholder="Passenger Capacity" required />
          <input type="text" name="cargoCapacity" value={newPlane.cargoCapacity  || ''} onChange={handleInputChange} placeholder="Cargo Capacity" required />
          <button className='my-button' type="submit">Add New Plane </button>
        </form>
      </div>
    </>
  );
  };

 
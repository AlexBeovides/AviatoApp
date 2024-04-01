import '../styles/Manager.scss';
import '../styles/FlightsManager.scss';
import { API_BASE_URL } from '../config';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from 'react';
import { ColDef, CellValueChangedEvent, GridReadyEvent, GridApi } from 'ag-grid-community';

type Flight = {
    id: number;
    arrivalTime: Date ;
    departureTime: Date ;
    planeId: number | null;
    ownerRoleId: number | null;
    planeConditionId: number | null;
    needsCheck: boolean;
};  

export const FlightsManager = () => {
  const [rowData, setRowData] = useState<Flight[]>([]);
  const [selectedRows, setSelectedRows] = useState<Flight[]>([]);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [newFlight, setNewFlight] = useState<Flight>({ id: 0, arrivalTime: new Date(), departureTime: new Date(), planeId: null, ownerRoleId: null, planeConditionId: null, needsCheck: false });

  const token = localStorage.getItem('token');

  const colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', editable: false, checkboxSelection: true },
    { field: 'arrivalTime', headerName: 'Arrival Time', editable: true },
    { field: 'departureTime', headerName: 'Departure Time', editable: true },
    { field: 'planeId', headerName: 'Plane ID', editable: true },
    { field: 'ownerRoleId', headerName: 'Owner Role ID', editable: true },
    { field: 'planeConditionId', headerName: 'Plane Condition ID', editable: true },
    { field: 'needsCheck', headerName: 'Needs Check', editable: true },
  ];

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'arrivalTime' || event.target.name === 'departureTime') {
      setNewFlight({ ...newFlight, [event.target.name]: new Date(event.target.value) });
    } else {
      setNewFlight({ ...newFlight, [event.target.name]: event.target.value });
    }
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      setSelectedRows(gridApi.getSelectedRows());
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/Flights`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {console.log('Response:', data);setRowData(data);})
      .catch(error => console.error('Error:', error));
  }, []);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { id, ...flightDTO} = newFlight; 

    fetch(`${API_BASE_URL}/Flights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(flightDTO),
    })
    .then(response => response.json())
    .then(data => {console.log(flightDTO); setRowData([...rowData, data]);})
    .catch(error => console.error('Error:', error));
  };
  
  const onCellValueChanged = (params : CellValueChangedEvent) => {
    const updatedFlight = params.data;
  
    fetch(`${API_BASE_URL}/Flights/${updatedFlight.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedFlight),
    })
      .catch(error => console.error('Error:', error));
  };

  const deleteSelectedRows = () => {
    if (window.confirm('Are you sure you want to delete the selected rows?')) {
      Promise.all(selectedRows.map(row => 
        fetch(`${API_BASE_URL}/Flights/${row.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      ))
      .then(() => fetch(`${API_BASE_URL}/Flights`))
      .then(response => response.json())
      .then(data => setRowData(data))
      .catch(error => console.error('Error:', error));
  
      setSelectedRows([]);
    }
  };
  
  return (
    <>
      <h2 className='page-header'>Flights Data:</h2>
      <div className='section-container'>
        <div className='table-container'>
          <div className="ag-theme-quartz manager-table" style={{ height: 400, width: 800 }}>
            <AgGridReact<Flight>
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
          <input type="datetime-local" name="arrivalTime" value={newFlight.arrivalTime.toISOString().slice(0,16) } onChange={handleInputChange} placeholder="Arrival Time" required />
          <input type="datetime-local" name="departureTime" value={newFlight.arrivalTime.toISOString().slice(0,16) }  onChange={handleInputChange} placeholder="Departure Time" required />
          <input type="number" name="planeId" value={newFlight.planeId || ''} onChange={handleInputChange} placeholder="Plane ID" />
          <input type="number" name="ownerRoleId" value={newFlight.ownerRoleId || ''} onChange={handleInputChange} placeholder="Owner Role ID" />
          <input type="number" name="planeConditionId" value={newFlight.planeConditionId || ''} onChange={handleInputChange} placeholder="Plane Condition ID" />
          <label className='need-check'>
            Needs Check? 
            <input type="checkbox" name="needsCheck" checked={newFlight.needsCheck} onChange={e => setNewFlight({ ...newFlight, needsCheck: e.target.checked })} placeholder="Needs Check" />
          </label>
          <button className='my-button' type="submit">Add New Flight</button>
        </form>
      </div>
    </>
  );
};
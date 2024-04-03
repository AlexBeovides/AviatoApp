import '../styles/Manager.scss';
import '../styles/FlightsManager.scss';
import { API_BASE_URL } from '../config';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from 'react';
import { ColDef, CellValueChangedEvent, GridReadyEvent, GridApi } from 'ag-grid-community';

type FlightRepair = {
    id: number;
    startedAt: Date ;
    finishedAt: Date ;
    flightId: number | null;
    repairId: number | null;
    duration: number;
    repairCost:number;
};  


export const FlightRepairsManager = () => {
  const [rowData, setRowData] = useState<FlightRepair[]>([]);
  const [selectedRows, setSelectedRows] = useState<FlightRepair[]>([]);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [newFlightRepair, setNewFlightRepair] = useState<FlightRepair>({ id: 0, startedAt: new Date(), finishedAt: new Date(), flightId: null, repairId: null, duration: 0, repairCost: 0 });

  const token = localStorage.getItem('token');

  const colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', editable: false, checkboxSelection: true },
    { field: 'startedAt', headerName: 'Started At', editable: true },
    { field: 'finishedAt', headerName: 'Finished At', editable: true },
    { field: 'flightId', headerName: 'Flight ID', editable: true },
    { field: 'repairId', headerName: 'Repair ID', editable: true },
    { field: 'duration', headerName: 'Duration', editable: true },
    { field: 'repairCost', headerName: 'Repair Cost', editable: true },
  ];

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'startedAt' || event.target.name === 'finishedAt') {
      setNewFlightRepair({ ...newFlightRepair, [event.target.name]: new Date(event.target.value) });
    } else {
      setNewFlightRepair({ ...newFlightRepair, [event.target.name]: Number(event.target.value) });
    }
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      setSelectedRows(gridApi.getSelectedRows());
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/FlightRepairs`, {
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
    const { id, ...flightRepairDTO} = newFlightRepair; 

    fetch(`${API_BASE_URL}/FlightRepairs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(flightRepairDTO),
    })
    .then(response => response.json())
    .then(data => {console.log(flightRepairDTO); setRowData([...rowData, data]);})
    .catch(error => console.error('Error:', error));
  };
  
  const onCellValueChanged = (params : CellValueChangedEvent) => {
    const updatedFlight = params.data;
  
    fetch(`${API_BASE_URL}/FlightRepairs/${updatedFlight.id}`, {
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
        fetch(`${API_BASE_URL}/FlightRepairs/${row.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      ))
      .then(() => fetch(`${API_BASE_URL}/FlightRepairs`))
      .then(response => response.json())
      .then(data => setRowData(data))
      .catch(error => console.error('Error:', error));
  
      setSelectedRows([]);
    }
  };
  
  return (
    <>
      <h2 className='page-header'>Flights Repairs Data:</h2>
      <div className='section-container'>
        <div className='table-container'>
          <div className="ag-theme-quartz manager-table" style={{ height: 400, width: 800 }}>
            <AgGridReact<FlightRepair>
              rowData={rowData}
              columnDefs={colDefs} 
              onCellValueChanged={onCellValueChanged}
              onGridReady={onGridReady}
              onSelectionChanged={onSelectionChanged}
              rowSelection="multiple"
              />
          </div>
        <button className='my-button delete-button' onClick={deleteSelectedRows}>Delete Selected Flight Repairs</button>
        </div>
        <form className="form-container" onSubmit={handleFormSubmit}>
          <input type="datetime-local" name="startedAt" value={newFlightRepair.startedAt.toISOString().slice(0,16) } onChange={handleInputChange} placeholder="Started At" required />
          <input type="datetime-local" name="finishedAt" value={newFlightRepair.finishedAt.toISOString().slice(0,16) }  onChange={handleInputChange} placeholder="Finished At" required />
          <input type="number" name="flightId" value={newFlightRepair.flightId || ''} onChange={handleInputChange} placeholder="Flight ID" />
          <input type="number" name="repairId" value={newFlightRepair.repairId || ''} onChange={handleInputChange} placeholder="Repair ID" />
          <button className='my-button' type="submit">Add New Flight Repair</button>
        </form>
      </div>
    </>
  );
};
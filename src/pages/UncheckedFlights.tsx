import '../styles/Manager.scss';
import '../styles/FlightsManager.scss';
import { API_BASE_URL } from '../config';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from 'react';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';

type Flight = {
    id: number;
    arrivalTime: Date ;
    departureTime: Date ;
    planeId: number | null;
    ownerRoleId: number | null;
    needsCheck: boolean;
};  

export const UncheckedFlights = () => {
  const [rowData, setRowData] = useState<Flight[]>([]);
  const [selectedRows, setSelectedRows] = useState<Flight[]>([]);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
 
  const token = localStorage.getItem('token');

  const colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', editable: false, checkboxSelection: true },
    { field: 'arrivalTime', headerName: 'Arrival Time', editable: true },
    { field: 'departureTime', headerName: 'Departure Time', editable: true },
    { field: 'planeId', headerName: 'Plane ID', editable: true },
    { field: 'ownerRoleId', headerName: 'Owner Role ID', editable: true },
    { field: 'needsCheck', headerName: 'Needs Check', editable: true },
  ];

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };


  const onSelectionChanged = () => {
    if (gridApi) {
      setSelectedRows(gridApi.getSelectedRows());
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/Flights/Unchecked`, {        // pending
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {console.log('Response:', data); setRowData(data);})
      .catch(error => console.error('Error:', error));
  }, []);


  const checkSelectedRows = () => {             // pending
    if (window.confirm('Are you sure you want to check the selected flights?')) {
      Promise.all(selectedRows.map(row => {
        const updatedFlight = { ...row, needsCheck: false };
  
        return fetch(`${API_BASE_URL}/Flights/CheckFlight/${row.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFlight),
        });
      }))
      .then(() => fetch(`${API_BASE_URL}/Flights/Unchecked`, {        // pending
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }))
      .then(response => response.json())
      .then(data => setRowData(data))
      .catch(error => console.error('Error:', error));
  
      setSelectedRows([]);
    }
  };
  
  return (
    <>
      <h2 className='page-header'>Flights with Pending Check:</h2>
      <div className='section-container'>
        <div className='table-container'>
          <div className="ag-theme-quartz manager-table" style={{ height: 400, width: 800 }}>
            <AgGridReact<Flight>
              rowData={rowData}
              columnDefs={colDefs} 
              onGridReady={onGridReady}
              onSelectionChanged={onSelectionChanged}
              rowSelection="multiple"
              />
          </div>
        <button className='my-button delete-button' onClick={checkSelectedRows}>Check the Selected Flights</button>
        </div>
      </div>
    </>
  );
};
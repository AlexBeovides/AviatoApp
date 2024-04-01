import '../styles/Manager.scss';
import { API_BASE_URL } from '../config';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from 'react';
import { ColDef, CellValueChangedEvent, GridReadyEvent, GridApi } from 'ag-grid-community';

type Airport = {
    id: number;
    name: string;
    address: string;
    latitude: number | null;
    longitude: number | null;
    isDeleted: boolean;
};

export const AirportsManager = () => {
  const [rowData, setRowData] = useState<Airport[]>([]);
  const [selectedRows, setSelectedRows] = useState<Airport[]>([]);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [newAirport, setNewAirport] = useState<Airport>({ id: 0, name: '', address: '', 
  latitude: null, longitude: null , isDeleted: false });

  const token = localStorage.getItem('token');

  const colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', editable: false, checkboxSelection: true },
    { field: 'isDeleted', headerName: 'Deleted', editable: true , filter: true,
    cellRenderer: (params: CellValueChangedEvent) => params.value ? 'true' : 'false'},
    { field: 'name', headerName: 'Name', editable: true },
    { field: 'address', headerName: 'Address', editable: true },
    { field: 'latitude', headerName: 'Latitude', editable: true },
    { field: 'longitude', headerName: 'Longitude', editable: true }
  ];

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewAirport({ ...newAirport, [event.target.name]: event.target.value });
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      setSelectedRows(gridApi.getSelectedRows());
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/Airports`)
      .then(response => response.json())
      .then(data => setRowData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { id, ...airportDTO} = newAirport;      // prevent sending id

    fetch(`${API_BASE_URL}/Airports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(airportDTO),
    })
    .then(response => response.json())
    .then(data => setRowData([...rowData, data]))
    .catch(error => console.error('Error:', error));
  };
  
  const onCellValueChanged = (params : CellValueChangedEvent) => {
    const updatedAirport = params.data;
    fetch(`${API_BASE_URL}/Airports/${updatedAirport.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedAirport),
    })
      .catch(error => console.error('Error:', error));
  };

  const deleteSelectedRows = () => {
    if (window.confirm('Are you sure you want to delete the selected rows?')) {
      Promise.all(selectedRows.map(row => 
        fetch(`${API_BASE_URL}/Airports/${row.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      ))
      .then(() => fetch(`${API_BASE_URL}/Airports`))
      .then(response => response.json())
      .then(data => setRowData(data))
      .catch(error => console.error('Error:', error));
  
      setSelectedRows([]);
    }
  };
  
  return (
    <>
      <h2 className='page-header'>Airports Data:</h2>
      <div className='section-container'>
        <div className='table-container'>
          <div className="ag-theme-quartz manager-table" style={{ height: 400, width: 800 }}>
            <AgGridReact<Airport>
              rowData={rowData}
                columnDefs={colDefs} 
                onCellValueChanged={onCellValueChanged}
                onGridReady={onGridReady}
                onSelectionChanged={onSelectionChanged}
                rowSelection="multiple"
              />
          </div>
        <button className='my-button delete-button' onClick={deleteSelectedRows}>Delete Selected Airports</button>
        </div>
        <form className="form-container" onSubmit={handleFormSubmit}>
          <input type="text" name="name" value={newAirport.name} onChange={handleInputChange} placeholder="Name" required />
          <input type="text" name="address" value={newAirport.address} onChange={handleInputChange} placeholder="Address" required />
          <input type="text" name="latitude" value={newAirport.latitude || ''} onChange={handleInputChange} placeholder="Latitude" required />
          <input type="text" name="longitude" value={newAirport.longitude || ''} onChange={handleInputChange} placeholder="Longitude" required />
          <button className='my-button' type="submit">Add New Airport </button>
        </form>
      </div>
    </>
  );
  };

import '../styles/Manager.scss';
import { API_BASE_URL } from '../config';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, CellValueChangedEvent, GridReadyEvent, GridApi } from 'ag-grid-community';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../AuthContext";

type Facility = {
    id: number;
    name: string;
    address: string;
    imgUrl: string;
    airportId: number | null;
    facilityTypeId: number | null;
    isDeleted: boolean;
};  
 
export const FacilitiesManager = () => {
  const [rowData, setRowData] = useState<Facility[]>([]);
  const [selectedRows, setSelectedRows] = useState<Facility[]>([]);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [newFacility, setNewPlane] = useState<Facility>({  id: 0 , name: '' , address: ''  , 
  imgUrl: '' , airportId: null, facilityTypeId: null , isDeleted: false });

  const token = localStorage.getItem('token');
  const { userAirportId } = useContext(AuthContext);

  const colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', editable: false, checkboxSelection: true },
    { field: 'isDeleted', headerName: 'Deleted', editable: true , filter: true, 
    cellRenderer: (params: CellValueChangedEvent) => params.value ? 'true' : 'false'},
    { field: 'name', headerName: 'Name', editable: true },
    { field: 'address', headerName: 'Address', editable: true },
    { field: 'imgUrl', headerName: 'Image Url', editable: true },
    { field: 'facilityTypeId', headerName: 'Facility Type ID', editable: true , filter: true }
  ];

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewPlane({ ...newFacility, [event.target.name]: event.target.value });
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      setSelectedRows(gridApi.getSelectedRows());
    }
  };
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/Facilities?airportId=${userAirportId}`)
      .then(response => response.json())
      .then(data => {console.log('Response:', data); setRowData(data);})
      .catch(error => console.error('Error:', error));
  }, []);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { id, ...facilityDTO} = newFacility;
    facilityDTO.airportId = userAirportId;

    fetch(`${API_BASE_URL}/Facilities?airportId=${userAirportId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(facilityDTO),
    })
    .then(response => response.json())
    .then(data => setRowData([...rowData, data]))
    .catch(error => console.error('Error:', error));
  };

  const onCellValueChanged = (params : CellValueChangedEvent) => {
    const updatedFacility = params.data;

    fetch(`${API_BASE_URL}/Facilities/${updatedFacility.id}?airportId=${userAirportId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedFacility),
    })
      .catch(error => console.error('Error:', error));
  };

  const deleteSelectedRows = () => {
    if (window.confirm('Are you sure you want to delete the selected rows?')) {
      Promise.all(selectedRows.map(row => 
        fetch(`${API_BASE_URL}/Facilities/${row.id}?airportId=${userAirportId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      ))
      .then(() => fetch(`${API_BASE_URL}/Facilities?airportId=${userAirportId}`))
      .then(response => response.json())
      .then(data => setRowData(data))
      .catch(error => console.error('Error:', error));
  
      setSelectedRows([]);
    }
  };

  return (
  <>
    <h2 className='page-header'>Facilities Data:</h2>
    <div className='section-container'>
      <div className='table-container'>
        <div className="ag-theme-quartz manager-table" style={{ height: 400, width: 800 }}>
          <AgGridReact<Facility>
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
        <input type="text" name="name" value={newFacility.name} onChange={handleInputChange} placeholder="Name" required />
        <input type="text" name="address" value={newFacility.address} onChange={handleInputChange} placeholder="Address" required />
        <input type="text" name="imgUrl" value={newFacility.imgUrl} onChange={handleInputChange} placeholder="Image URL" required />
        <input type="text" name="facilityTypeId" value={newFacility.facilityTypeId || ''} onChange={handleInputChange} placeholder="Facility Type ID" />
        <button className='my-button' type="submit">Add New Facility</button>
      </form>
    </div>
  </>
);
};

 
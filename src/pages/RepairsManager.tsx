import '../styles/Manager.scss';
import { API_BASE_URL } from '../config';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, CellValueChangedEvent, GridReadyEvent, GridApi } from 'ag-grid-community';
import { useEffect, useState } from 'react'; 

type Repair = {
    id: number;
    isDeleted: boolean;
    facilityId: number | null;
    repairTypeId: number | null;
    name: string;
    description: string;
    imgUrl: string;
    price: number | null;
};     
 
export const RepairsManager = () => {
  const [rowData, setRowData] = useState<Repair[]>([]);
  const [selectedRows, setSelectedRows] = useState<Repair[]>([]);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [newRepair, setNewRepair] = useState<Repair>({ id: 0, isDeleted: false, 
    facilityId: null,repairTypeId: null, name: '',description: '',imgUrl: '',price: null });

  const token = localStorage.getItem('token');

  const colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', editable: false, checkboxSelection: true },
    { field: 'isDeleted', headerName: 'Deleted', editable: true, filter: true, cellRenderer: (params: CellValueChangedEvent) => params.value ? 'true' : 'false'},
    { field: 'facilityId', headerName: 'Facility ID', editable: true, filter: true },
    { field: 'repairTypeId', headerName: 'Repair Type ID', editable: true, filter: true },
    { field: 'name', headerName: 'Name', editable: true },
    { field: 'description', headerName: 'Description', editable: true },
    { field: 'imgUrl', headerName: 'Image Url', editable: true },
    { field: 'price', headerName: 'Price', editable: true, filter: true }
  ];

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRepair({ ...newRepair, [event.target.name]: event.target.value });
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      setSelectedRows(gridApi.getSelectedRows());
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/Repairs`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => setRowData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { id, ...repairDTO} = newRepair; 
  
    fetch(`${API_BASE_URL}/Repairs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(repairDTO),
    })
    .then(() => {
      // Fetch the updated data after successful post
      fetch(`${API_BASE_URL}/Repairs`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        // Update the state with the new data
        setRowData(data);
        // Reset the form
        setNewRepair({ id: 0, isDeleted: false, facilityId: null, repairTypeId: null, name: '', description: '', imgUrl: '', price: null });
      })
      .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
  };

  const onCellValueChanged = (params : CellValueChangedEvent) => {
    const updatedRepair = params.data;

    fetch(`${API_BASE_URL}/Repairs/${updatedRepair.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedRepair),
    })
      .catch(error => console.error('Error:', error));
  };

  const deleteSelectedRows = () => {
    if (window.confirm('Are you sure you want to delete the selected rows?')) {
      Promise.all(selectedRows.map(row => 
        fetch(`${API_BASE_URL}/Services/${row.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      ))
      .then(() => fetch(`${API_BASE_URL}/Repairs`, {
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
    <h2 className='page-header'>Repairs Data:</h2>
    <div className='section-container'>
      <div className='table-container'>
        <div className="ag-theme-quartz manager-table" style={{ height: 400, width: 800 }}>
          <AgGridReact<Repair>
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
        <input type="text" name="name" value={newRepair.name} onChange={handleInputChange} placeholder="Name" required />
        <input type="text" name="description" value={newRepair.description} onChange={handleInputChange} placeholder="Description" required />
        <input type="text" name="imgUrl" value={newRepair.imgUrl} onChange={handleInputChange} placeholder="ImageUrl" required />
        <input type="text" name="facilityId" value={newRepair.facilityId || ''} onChange={handleInputChange} placeholder="Facility ID" />
        <input type="text" name="repairTypeId" value={newRepair.repairTypeId || ''} onChange={handleInputChange} placeholder="Repair Type ID" />
        <input type="text" name="price" value={newRepair.price || ''} onChange={handleInputChange} placeholder="Price" />
        <button className='my-button' type="submit">Add New Repair</button>
      </form>
    </div>
  </>
);
};
 
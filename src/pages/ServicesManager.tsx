import '../styles/Manager.scss';
import { API_BASE_URL } from '../config';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, CellValueChangedEvent, GridReadyEvent, GridApi } from 'ag-grid-community';
import { useEffect, useState } from 'react';

type Service = {
    id: number;
    isDeleted: boolean;
    facilityId: number | null;
    name: string;
    description: string;
    imgUrl: string;
    price: number | null;
    averageRating: number | null;
};     
 
export const ServicesManager = () => {
  const [rowData, setRowData] = useState<Service[]>([]);
  const [selectedRows, setSelectedRows] = useState<Service[]>([]);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [newService, setNewService] = useState<Service>({ id: 0, isDeleted: false, 
    facilityId: null, name: '',description: '', averageRating: null, price: null ,imgUrl: '' });

  const token = localStorage.getItem('token');

  const colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', editable: false, checkboxSelection: true },
    { field: 'isDeleted', headerName: 'Deleted', editable: true, filter: true, cellRenderer: (params: CellValueChangedEvent) => params.value ? 'true' : 'false'},
    { field: 'name', headerName: 'Name', editable: true },
    { field: 'description', headerName: 'Description', editable: true },
    { field: 'averageRating', headerName: 'Average Rating', filter: true },
    { field: 'imgUrl', headerName: 'Image Url', editable: true },
    { field: 'facilityId', headerName: 'Facility ID', editable: true, filter: true },
    { field: 'price', headerName: 'Price', editable: true, filter: true }
  ];

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewService({ ...newService, [event.target.name]: event.target.value });
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      setSelectedRows(gridApi.getSelectedRows());
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/Services`, {
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
    const { id, averageRating, ...serviceDTO} = newService; 

    fetch(`${API_BASE_URL}/Services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(serviceDTO),
    })
    .then(response => response.json())
    .then(data => setRowData([...rowData, data]))
    .catch(error => console.error('Error:', error));
  };

  const onCellValueChanged = (params : CellValueChangedEvent) => {
    const updatedService = params.data;

    fetch(`${API_BASE_URL}/Services/${updatedService.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedService),
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
      .then(() => fetch(`${API_BASE_URL}/Services`, {
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
    <h2 className='page-header'>Services Data:</h2>
    <div className='section-container'>
      <div className='table-container'>
        <div className="ag-theme-quartz manager-table" style={{ height: 400, width: 800 }}>
          <AgGridReact<Service>
            rowData={rowData}
            columnDefs={colDefs} 
            onCellValueChanged={onCellValueChanged}
            onGridReady={onGridReady}
            onSelectionChanged={onSelectionChanged}
            rowSelection="multiple"
            />
        </div>
      <button className='my-button delete-button' onClick={deleteSelectedRows}>Delete Selected Services</button>
      </div>
      
      <form className="form-container" onSubmit={handleFormSubmit}>
        <input type="text" name="name" value={newService.name} onChange={handleInputChange} placeholder="Name" required />
        <input type="text" name="description" value={newService.description} onChange={handleInputChange} placeholder="Description" required />
        <input type="text" name="imgUrl" value={newService.imgUrl} onChange={handleInputChange} placeholder="ImageUrl" required />
        <input type="text" name="facilityId" value={newService.facilityId || ''} onChange={handleInputChange} placeholder="Facility ID" />
        <input type="text" name="price" value={newService.price || ''} onChange={handleInputChange} placeholder="Price" />
        <button className='my-button' type="submit">Add New Service</button>
      </form>
    </div>
  </>
);
};
 
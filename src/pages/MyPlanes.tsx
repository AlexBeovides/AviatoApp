import '../styles/Manager.scss';
import { API_BASE_URL } from '../config';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from 'react';
import { ColDef } from 'ag-grid-community';

type Plane = {
    id: number;
    classification: string;
    crewCount: number  | null;
    passengerCapacity: number | null;
    cargoCapacity: number | null;
};  
 
export const MyPlanes = () => {
  const [rowData, setRowData] = useState<Plane[]>([]);
  const token = localStorage.getItem('token');

  const colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', editable: false },
    { field: 'classification', headerName: 'Classification',  filter: true },
    { field: 'crewCount', headerName: 'Crew Count' },
    { field: 'passengerCapacity', headerName: 'Passenger Capacity' },
    { field: 'cargoCapacity', headerName: 'Cargo Capacity'},
  ];

  useEffect(() => {
    fetch(`${API_BASE_URL}/Planes/MyPlanes`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {console.log('Response:', data); setRowData(data);})
      .catch(error => console.error('Error:', error));
  }, []);


  return (
    <>
      <h2 className='page-header'>My Planes:</h2>
      <div className='section-container'>
      <div className='table-container'>
        <div className="ag-theme-quartz manager-table" style={{ height: 400, width: 800 }}>
          <AgGridReact<Plane>
            rowData={rowData}
            columnDefs={colDefs} 
            />
        </div>
      </div>
    </div>
    </>
  );
  };

 
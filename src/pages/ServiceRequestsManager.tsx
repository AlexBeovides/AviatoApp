import '../styles/Manager.scss';
import { API_BASE_URL } from '../config';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from 'react';
import { ColDef } from 'ag-grid-community';

type ServiceRequest = {
  id: number;
  requestedAt: Date;
  clientId: string;
  serviceId: number;
};

export const ServiceRequestsManager = () => {
  const [rowData, setRowData] = useState<ServiceRequest[]>([]);
  const token = localStorage.getItem('token');

  const colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', editable: false },
    { field: 'requestedAt', headerName: 'Requested At', width: 150 },
    { field: 'clientId', headerName: 'Client ID', width: 150 },
    { field: 'serviceId', headerName: 'Service ID', width: 150 },
  ];

  useEffect(() => {
    fetch(`${API_BASE_URL}/ServiceRequests`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data =>  setRowData(data))
      .catch(error => console.error('Error:', error));
  }, []);


  return (
    <>
      <h2 className='page-header'>Service Requests:</h2>
      <div className='section-container'>
      <div className='table-container'>
        <div className="ag-theme-quartz manager-table" style={{ height: 400, width: 800 }}>
          <AgGridReact<ServiceRequest>
            rowData={rowData}
            columnDefs={colDefs} 
            />
        </div>
      </div>
    </div>
    </>
  );
  };

 
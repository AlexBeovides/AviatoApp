import '../styles/Manager.scss';
import { API_BASE_URL } from '../config';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from 'ag-grid-community';
import { useEffect, useState } from 'react';

type Review = {
    id: number;
    rating: number;
    comment: string;
    reviewdAt: Date;
    clientId: string;
    serviceId: number;
};     
 
export const ReviewsManager = () => {
  const [rowData, setRowData] = useState<Review[]>([]);
  const token = localStorage.getItem('token');

  const colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', editable: false},
    { field: 'clientId', headerName: 'Client ID', filter: true },
    { field: 'serviceId', headerName: 'Service ID', filter: true },
    { field: 'rating', headerName: 'Rating', filter: true },
    { field: 'comment', headerName: 'Comment' },
    { field: 'reviewedAt', headerName: 'Reviewed dAt' },
  ];

  useEffect(() => {
    fetch(`${API_BASE_URL}/Reviews`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(data => setRowData(data))
    .catch(error => console.error('Error:', error));
  }, []);

  return (
  <>
    <h2 className='page-header'>Reviews Data:</h2>
    <div className='section-container'>
      <div className='table-container'>
        <div className="ag-theme-quartz manager-table" style={{ height: 400, width: 800 }}>
          <AgGridReact<Review>
            rowData={rowData}
            columnDefs={colDefs} 
            />
        </div>
      </div>
    </div>
  </>
);
};
 
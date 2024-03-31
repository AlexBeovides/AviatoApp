import '../styles/Manager.scss';
import { API_BASE_URL } from '../config';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, CellValueChangedEvent, GridReadyEvent, GridApi } from 'ag-grid-community';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../AuthContext";

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
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const token = localStorage.getItem('token');
  const { userAirportId } = useContext(AuthContext);

  const colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', editable: false},
    { field: 'clientId', headerName: 'Client ID', filter: true },
    { field: 'serviceId', headerName: 'Service ID', filter: true },
    { field: 'rating', headerName: 'Rating', filter: true },
    { field: 'comment', headerName: 'Comment' },
    { field: 'reviewedAt', headerName: 'Reviewed dAt' },
  ];

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/Reviews?airportId=${userAirportId}`)
      .then(response => response.json())
      .then(data => {console.log('Response:', data); setRowData(data);})
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
            onGridReady={onGridReady}
            />
        </div>
      </div>

    </div>
  </>
);
};
 
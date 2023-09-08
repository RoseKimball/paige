"use client";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Data from '../../public/product-fixtures.json';


export default function Home() {
  console.log('data', Data)
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', minWidth: 250, align: 'left', headerAlign: 'left', filterable: false},
    { field: 'color', headerName: 'Color', width: 130, flex: 1, align: 'center', headerAlign: 'center'},
    { field: 'type', headerName: 'Type', width: 130, flex: 1, align: 'center', headerAlign: 'center', filterable: false },
    {
      field: 'cost',
      headerName: 'Cost',
      type: 'number',
      width: 90,
      align: 'right',
      headerAlign: 'right',
      filterable: false
    }
  ];
  
  const rows = Data.map((item) => ({
    id: item.id,
    name: item.name,
    color: item.color,
    type: item.type,
    cost: item.price

  }))

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ marginLeft: 'auto' }}>
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }

  return (
    <Box sx={{ height: 'auto', width: '100%' }}>
       <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ m: 4 }}
          slots={{
            toolbar: CustomToolbar,
          }}
      />
    </Box>
  )
}

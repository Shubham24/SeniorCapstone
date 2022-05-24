
import { GridColDef } from "@mui/x-data-grid";

// JSON Object Containing Location dummy data


// Define Columns
const col: GridColDef[] = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    { field: 'numUsers', headerName: 'Users', flex: 1 },
]

// Dummy Data, a.k.a Rows
const row = [
    { id: '1', city: 'Columbus', state: 'Ohio', numUsers: '4' },
    { id: '2', city: 'Seattle', state: 'Washington', numUsers: '1' },
    { id: '3', city: 'San Francisco', state: 'California', numUsers: '1' },
    { id: '4', city: 'Centerville', state: 'Utah', numUsers: '4' },

]


// Location Data as an Object
const LocationData = {
    columns: col,
    rows: row
}

export default LocationData;
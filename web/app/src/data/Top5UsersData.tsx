
import { GridColDef } from "@mui/x-data-grid";

// JSON Object Containing Top 5 Users dummy data

// Define Each Column
const col: GridColDef[] = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'timeSpent', headerName: 'Time Spent', flex: 1 },
]

// Data, a.k.a. Rows
const row = [
    { id: '1', firstName: 'User', lastName: 'A', email: 'user.a@test.com', timeSpent: '75 hours' },
    { id: '2', firstName: 'User', lastName: 'B', email: 'user.b@test.com', timeSpent: '66 hours' },
    { id: '3', firstName: 'User', lastName: 'C', email: 'user.c@test.com', timeSpent: '41 hours' },
    { id: '4', firstName: 'User', lastName: 'D', email: 'user.d@test.com', timeSpent: '24 hours' },
    { id: '5', firstName: 'User', lastName: 'E', email: 'user.e@test.com', timeSpent: '6 hours' },
]


// TopCoursesDataObject
const TopUsersData = {
    columns: col,
    rows: row
}

export default TopUsersData;
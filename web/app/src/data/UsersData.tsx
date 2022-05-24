
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
    { id: '6', firstName: 'User', lastName: 'F', email: 'user.f@test.com', timeSpent: '75 hours' },
    { id: '7', firstName: 'User', lastName: 'G', email: 'user.g@test.com', timeSpent: '66 hours' },
    { id: '8', firstName: 'User', lastName: 'H', email: 'user.h@test.com', timeSpent: '41 hours' },
    { id: '9', firstName: 'User', lastName: 'I', email: 'user.i@test.com', timeSpent: '24 hours' },
    { id: '10', firstName: 'User', lastName: 'J', email: 'user.j@test.com', timeSpent: '6 hours' },
    { id: '11', firstName: 'User', lastName: 'K', email: 'user.k@test.com', timeSpent: '75 hours' },
    { id: '12', firstName: 'User', lastName: 'L', email: 'user.l@test.com', timeSpent: '66 hours' },
    { id: '13', firstName: 'User', lastName: 'M', email: 'user.m@test.com', timeSpent: '41 hours' },
    { id: '14', firstName: 'User', lastName: 'N', email: 'user.n@test.com', timeSpent: '24 hours' },
    { id: '15', firstName: 'User', lastName: 'O', email: 'user.o@test.com', timeSpent: '6 hours' },
    { id: '16', firstName: 'User', lastName: 'P', email: 'user.p@test.com', timeSpent: '75 hours' },
    { id: '17', firstName: 'User', lastName: 'Q', email: 'user.q@test.com', timeSpent: '66 hours' },
    { id: '18', firstName: 'User', lastName: 'R', email: 'user.r@test.com', timeSpent: '41 hours' },
    { id: '19', firstName: 'User', lastName: 'S', email: 'user.s@test.com', timeSpent: '24 hours' },
    { id: '20', firstName: 'User', lastName: 'T', email: 'user.t@test.com', timeSpent: '6 hours' },

]


// TopCoursesDataObject
const UsersData = {
    columns: col,
    rows: row
}

export default UsersData;
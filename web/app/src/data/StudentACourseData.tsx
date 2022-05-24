
import { GridColDef } from "@mui/x-data-grid";

// JSON Object Containing Top Courses dummy data

// Define Each Column
const col: GridColDef[] = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'courseName', headerName: 'Name', flex: 1 },
    { field: 'percentComplete', headerName: '% Complete', flex: 1 },
    { field: 'timeSpent', headerName: 'Time Spent', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 }
]

// Data, a.k.a. Rows
const row = [
    { id: '1', courseName: 'Course A', percentComplete: '13%', timeSpent: '2 hours', status: 'In Progress' },
    { id: '2', courseName: 'Course B', percentComplete: '14%', timeSpent: '10 hours', status: 'In Progress' },
    { id: '3', courseName: 'Course C', percentComplete: '13%', timeSpent: '5 hours', status: 'In Progress' },
    { id: '4', courseName: 'Course D', percentComplete: '25%', timeSpent: '32 hours', status: 'In Progress' },
    { id: '5', courseName: 'Course E', percentComplete: '36%', timeSpent: '26 hours', status: 'In Progress' },
    { id: '6', courseName: 'Course F', percentComplete: '100%', timeSpent: '441 hours', status: 'Done' },
    { id: '7', courseName: 'Course G', percentComplete: '100%', timeSpent: '254 hours', status: 'Done' },
    { id: '8', courseName: 'Course H', percentComplete: '100%', timeSpent: '451 hours', status: 'Done' },
]


// TopCoursesDataObject
const StudentACourseData = {
    columns: col,
    rows: row
}

export default StudentACourseData;
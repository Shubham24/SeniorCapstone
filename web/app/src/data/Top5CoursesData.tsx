
import { GridColDef } from "@mui/x-data-grid";

// JSON Object Containing Top 5 Courses dummy data

// Define Each Column
const col: GridColDef[] = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'courseName', headerName: 'Name', flex: 1 },
    { field: 'percentComplete', headerName: '% Complete', flex: 1 },
    { field: 'timeSpent', headerName: 'Time Spent', flex: 1 },
]

// Data, a.k.a. Rows
const row = [
    { id: '1', courseName: 'Course A', percentComplete: '100%', timeSpent: '451 hours' },
    { id: '2', courseName: 'Course B', percentComplete: '98%', timeSpent: '254 hours' },
    { id: '3', courseName: 'Course C', percentComplete: '98%', timeSpent: '451 hours' },
    { id: '4', courseName: 'Course D', percentComplete: '88%', timeSpent: '111 hours' },
    { id: '5', courseName: 'Course E', percentComplete: '74%', timeSpent: '100 hours' },
]


// TopCoursesDataObject
const TopCoursesData = {
    columns: col,
    rows: row
}

export default TopCoursesData;

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
    { id: '1', courseName: 'Course A', percentComplete: '100%', timeSpent: '451 hours', status: 'Done' },
    { id: '2', courseName: 'Course B', percentComplete: '98%', timeSpent: '254 hours', status: 'Active' },
    { id: '3', courseName: 'Course C', percentComplete: '98%', timeSpent: '451 hours', status: 'Active' },
    { id: '4', courseName: 'Course D', percentComplete: '88%', timeSpent: '111 hours', status: 'Active' },
    { id: '5', courseName: 'Course E', percentComplete: '74%', timeSpent: '100 hours', status: 'Active' },
    { id: '6', courseName: 'Course F', percentComplete: '74%', timeSpent: '100 hours', status: 'Active' },
    { id: '7', courseName: 'Course G', percentComplete: '74%', timeSpent: '100 hours', status: 'Active' },
    { id: '8', courseName: 'Course H', percentComplete: '15%', timeSpent: '10 hours', status: 'Active' },
    { id: '9', courseName: 'Course I', percentComplete: '74%', timeSpent: '100 hours', status: 'Active' },
    { id: '10', courseName: 'Course J', percentComplete: '74%', timeSpent: '100 hours', status: 'Active' },
    { id: '11', courseName: 'Course K', percentComplete: '74%', timeSpent: '19 hours', status: ' In Active' },
    { id: '12', courseName: 'Course L', percentComplete: '78%', timeSpent: '78 hours', status: 'In Active' },
    { id: '13', courseName: 'Course M', percentComplete: '74%', timeSpent: '18 hours', status: 'Active' },
    { id: '14', courseName: 'Course N', percentComplete: '74%', timeSpent: '78 hours', status: 'Active' },
    { id: '15', courseName: 'Course O', percentComplete: '12%', timeSpent: '120 hours', status: 'Active' },
    { id: '16', courseName: 'Course P', percentComplete: '14%', timeSpent: '10 hours', status: 'In Active' },
    { id: '17', courseName: 'Course Q', percentComplete: '24%', timeSpent: '80 hours', status: 'Active' },
    { id: '18', courseName: 'Course R', percentComplete: '3%', timeSpent: '31 hours', status: 'Active' },
    { id: '19', courseName: 'Course S', percentComplete: '6%', timeSpent: '77 hours', status: 'Active' },
    { id: '20', courseName: 'Course T', percentComplete: '74%', timeSpent: '66 hours', status: 'Active' },
    { id: '21', courseName: 'Course U', percentComplete: '74%', timeSpent: '50 hours', status: 'Active' },
    { id: '22', courseName: 'Course V', percentComplete: '8%', timeSpent: '0 hours', status: 'Not Started' },
]


// TopCoursesDataObject
const CoursesData = {
    columns: col,
    rows: row
}

export default CoursesData;
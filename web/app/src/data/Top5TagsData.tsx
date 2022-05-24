
import { GridColDef } from "@mui/x-data-grid";

// JSON Object Containing Top 5 Courses dummy data

// Define Each Column
const col: GridColDef[] = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'tagName', headerName: 'Name', flex: 1 }
]

// Data, a.k.a. Rows
const row = [
    { id: '1', tagName: 'Tag A' },
    { id: '2', tagName: 'Tag B' },
    { id: '3', tagName: 'Tag C' },
    { id: '4', tagName: 'Tag D' },
    { id: '5', tagName: 'Tag E' },
]


// TopCoursesDataObject
const TopTagsData = {
    columns: col,
    rows: row
}

export default TopTagsData;
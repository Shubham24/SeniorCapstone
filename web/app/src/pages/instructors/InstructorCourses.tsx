import React from 'react'
import { Container, Grid, Link } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import InfoCard from '../../components/infocard/InfoCard'
import DataGridCard from '../../components/datagridcard/DataGridCard'
import dummyQueries from '../../data/dummy/DummyQueries'
import { GridColDef } from '@mui/x-data-grid'



/* Courses Page */
/* Currently contains components with dummy data */
export default function InstructorCourses() {
    // Get history for 'react-router-dom'
    const history = useHistory();

    // Get user from Redux store
    const user = useSelector((state: any) => state.userReducer);

    // Get course info
    const allCourses = dummyQueries.getInstructorCourses(user.id);
    let numStudents = 0;

    /** 
     * Function that handles taking the user to the correct course page when clicked on course link/button
     * @param data : data that will be used to push the path and send state information to the next component over
     */
    const handleClickCourse = (data: any) => () => {
        history.push(`courses/${data.id}`, { id: data.id, name: data.name, grade: data.grade, instructor: data.instructor });
    };

    // Col definitions for DataGrid component
    const col: GridColDef[] = [
        { field: 'id', headerName: 'Name', filterable: false, minWidth: 150, flex: 1, renderCell: (params: any) => <Link onClick={handleClickCourse(dummyQueries.getCourse(params.value as number))}>{dummyQueries.getCourse(params.value as number).name}</Link> },
        { field: 'name', headerName: 'Name', hide: true },
        { field: 'grade', headerName: 'Avg Grade', type: 'number', minWidth: 150, flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 },
        { field: 'startDate', headerName: 'Start Date', type: 'date', minWidth: 150, flex: 1 },
        { field: 'endDate', headerName: 'End Date', type: 'date', minWidth: 150, flex: 1 },
    ];

    // Row data for DataGrid Component
    const rows: any = [];

    // Get all the necessary data from all of the courses and push onto rows
    allCourses.forEach((course: any) => {
        numStudents += course.students.length;
        rows.push({
            id: course.id,
            name: course.name,
            grade: dummyQueries.getStudentGrade(user.id, course.id),
            instructor: dummyQueries.getUser(course.instructor).firstName + ' ' + dummyQueries.getUser(course.instructor).lastName,
            status: course.status,
            startDate: course.startDate.toDateString(),
            endDate: course.endDate.toDateString()
        });
    });

    // front end content
    return (
        <div>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <InfoCard title='Courses' value={allCourses.length.toString()}></InfoCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoCard title='Students' value={numStudents.toString()}></InfoCard>
                    </Grid>
                    <Grid item xs={12}>
                        <DataGridCard title={'Courses'} rows={rows} columns={col} pagination={true} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

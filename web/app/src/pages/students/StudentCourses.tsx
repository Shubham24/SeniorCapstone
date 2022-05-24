import React from 'react'
import { Container, Grid, Link } from '@material-ui/core'
import InfoCard from '../../components/infocard/InfoCard'
import DataGridCard from '../../components/datagridcard/DataGridCard'
import { useSelector } from 'react-redux'
import dummyQueries from '../../data/dummy/DummyQueries'
import { GridColDef } from '@mui/x-data-grid'
import { useHistory } from 'react-router-dom'



/* Courses Page pertaining to a Student User */
export default function StudentCourses() {

    // Get history for 'react-router-dom'
    const history = useHistory();

    // Get user from Redux store
    const user = useSelector((state: any) => state.userReducer);

    // Get course info
    const numActiveCourses = dummyQueries.getStudentsActiveCourses(user.id).length;
    const allCourses = dummyQueries.getStudentsCourses(user.id);

    // Object that will keep track of # courses with a certain grade
    const numGradeRange = {
        'A': 0,
        'B': 0,
        'C': 0,
        'D': 0,
        'E': 0
    };

    // For each course, populate numGradeRange
    allCourses.forEach((course: any) => {
        const grade: number = dummyQueries.getStudentGrade(user.id, course.id);
        if (grade >= 90) {
            numGradeRange['A'] += 1;
        } else if (grade >= 80) {
            numGradeRange['B'] += 1;
        }
        else if (grade >= 70) {
            numGradeRange['C'] += 1;
        }
        else if (grade >= 60) {
            numGradeRange['D'] += 1;
        }
        else {
            numGradeRange['E'] += 1;
        }
    });

    /** 
     * Function that handles taking the user to the correct course page when clicked on course link/button
     * @param data : data that will be used to push the path and send state information to the next component over
     */
     const handleClickCourse = (data: any) => () => {
        history.push(`courses/${data.id}`, { id: data.id, name: data.name, grade: data.grade, instructor: data.instructor });
    };

    // Col definitions for DataGrid component
    const col: GridColDef[] = [
        { field: 'id', headerName: 'Name', flex: 1, renderCell: (params: any) => <Link onClick={handleClickCourse(dummyQueries.getCourse(params.value))}>{dummyQueries.getCourse(params.value).name}</Link> },
        { field: 'name', headerName: 'Name', hide: true, minWidth: 150, flex: 1 },
        { field: 'grade', headerName: 'Grade', type:'number', minWidth: 150, flex: 1 },
        { field: 'instructor', headerName: 'Instructor', minWidth: 150, flex: 1 },
        { field: 'status', headerName: 'Status', minWidth: 150, flex: 1 },
        { field: 'startDate', headerName: 'Start Date', type: 'date', minWidth: 150, flex: 1 },
        { field: 'endDate', headerName: 'End Date', type: 'date', minWidth: 150, flex: 1 },
    ];

    // Row data for DataGrid Component
    const rows: any = [];

    // Get all the necessary data from all of the courses and push onto rows
    allCourses.forEach((course: any) => {
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
                        <InfoCard title='# Courses with A grade' value={numGradeRange['A'].toString()}></InfoCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoCard title='Courses in Progress' value={numActiveCourses.toString()}></InfoCard>
                    </Grid>
                    <Grid item xs={12}>
                        <DataGridCard title={'Courses'} rows={rows} columns={col} pagination={true} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

import React from 'react';
import Layout from '../../components/layout/Layout';
import { Container, Grid, Link } from '@material-ui/core';
import InfoCard from '../../components/infocard/InfoCard';
import LineChartCard from '../../components/linechartcard/LineChartCard';
import DataGridCard from '../../components/datagridcard/DataGridCard';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import dummyQueries from '../../data/dummy/DummyQueries';
import { GridColDef } from '@mui/x-data-grid';


function StudentCourse(location: any) {

    // get location and history from 'react-router-dom'
    const loc = useLocation();
    const history = useHistory();

    // get user from Redux store
    let user = useSelector((state: any) => state.userReducer);

    // get course_id from path
    let course_id = parseInt(loc.pathname.substring(loc.pathname.lastIndexOf('/') + 1))

    // get instructor and assignment info
    let instructor = dummyQueries.getCourseIntructor(course_id);
    let assignments = dummyQueries.getStudentCourseAssignments(user.id, course_id);
    let submissions = dummyQueries.getStudentCourseSubmissions(user.id, course_id);
    let late_submissions = dummyQueries.getStudentCourseLateSubmissions(user.id, course_id);

    // axis definitions
    let axis = {
        xaxis: {
            dataKey: 'date'
        },

        yaxis: [
            {
                dataKey: 'grade',
                stroke: '#8884d8'
            }
        ]
    }

    /*
     * Function that handles taking the user to the correct assignment page when clicked on course link/button
     * @param data : data that will be used to push the path and send state information to the next component over
     */
    const handleClickAssignment = (data: any) => () => {
        history.push(`/assignments/${data.id}`, { id: data.id, name: data.name });
    };

    // Column definitions for DataGrid component
    const col: GridColDef[] = [
        { field: 'id', headerName: 'Name', hide: false, minWidth: 150, flex: 1, renderCell: (params: any) => <Link onClick={handleClickAssignment(dummyQueries.getAssignment(params.value))}>{dummyQueries.getAssignment(params.value).name}</Link> },
        { field: 'name', headerName: 'Name', hide: true, minWidth: 150, flex: 1, renderCell: (params: any) => <Link onClick={handleClickAssignment(params.value)}>{params.value}</Link> },
        { field: 'grade', headerName: 'Grade', type: 'number', minWidth: 150, flex: 1 },
        { field: 'points_earned', headerName: 'Points Earned', type: 'number', minWidth: 150, flex: 1 },
        { field: 'points_possible', headerName: 'Points Possible', type: 'number', minWidth: 150, flex: 1 },
        { field: 'date_submitted', headerName: 'Date Submitted', type: 'date', minWidth: 150, flex: 1 },
        { field: 'due_date', headerName: 'Due Date', type: 'date', minWidth: 150, flex: 1 },
    ];


    // Row data for DataGrid component
    const rows: any = [];

    // For each assignment, get the necessary info and push onto rows
    assignments.forEach((assignment: any) => {
        rows.push({
            id: assignment.id,
            name: assignment.name,
            grade: assignment.grade,
            points_earned: assignment.pointsEarned,
            points_possible: assignment.pointsPossible,
            date_submitted: assignment.dateSubmitted ? assignment.dateSubmitted.toDateString() : null,
            due_date: assignment.dueDate.toDateString(),
        });
    });

    // front end content
    return (
        <div>
            <Layout role={user.role}>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} >
                            <InfoCard title='Grade' value={`${dummyQueries.getStudentGrade(user.id, course_id)}%`}></InfoCard>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <InfoCard title='Instructor' value={instructor?.firstName + ' ' + instructor?.lastName}></InfoCard>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LineChartCard title='Grade' data={dummyQueries.getStudentCourseGradeTrend(user.id, course_id)} axis={axis}></LineChartCard>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <InfoCard title='Assignments' value={assignments.length.toString()}></InfoCard>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InfoCard title='Submitted' value={submissions.length.toString()}></InfoCard>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InfoCard title='Unsubmitted' value={(assignments.length - submissions.length).toString()}></InfoCard>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InfoCard title='Late' value={late_submissions.length.toString()}></InfoCard>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <DataGridCard title={'Assignments'} rows={rows} columns={col} pagination={true} />
                        </Grid>
                    </Grid>
                </Container>
            </Layout>
        </div>
    )
}


export default StudentCourse






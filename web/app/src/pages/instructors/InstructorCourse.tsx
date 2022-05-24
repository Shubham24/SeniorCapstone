import React from 'react'
import { Container, Grid, Link } from '@material-ui/core'
import Layout from '../../components/layout/Layout'
import InfoCard from '../../components/infocard/InfoCard'
import LineChartCard from '../../components/linechartcard/LineChartCard'
import BarChartCard from '../../components/barchartcard/BarChartCard'
import DataGridCard from '../../components/datagridcard/DataGridCard'
import dummyQueries from '../../data/dummy/DummyQueries'
import { useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { GridColDef } from '@mui/x-data-grid'


export default function InstructorCourse() {

    // get location and history from 'react-router-dom'
    const loc = useLocation();
    const history = useHistory();

    // get user from Redux store
    let user = useSelector((state: any) => state.userReducer);

    // get course_id from path
    let course_id = parseInt(loc.pathname.substring(loc.pathname.lastIndexOf('/') + 1))

    // get data to display the page
    const assignmentData = dummyQueries.getCourseAssignmentData(course_id);
    const gradeDistribution = dummyQueries.getCourseGradeDistribution(course_id);
    const averageGradeTrend = dummyQueries.getCourseAverageGradeTrend(course_id);
    const studentData = dummyQueries.getCourseStudentData(course_id);

    /*
     * Function that handles taking the user to the correct assignment page when clicked on course link/button
     * @param data : data that will be used to push the path and send state information to the next component over
     */
    const handleClickAssignment = (data: any) => () => {
        window.scrollTo(0, 0);
        history.push(`/assignments/${data.id}`, { id: data.id, name: data.name });
    };

    // axis definitions for bar chart
    const bar_axis = {
        xaxis: {
            dataKey: "name"
        }
    }

    const bar = {
        dataKey: "value",
        fill: "#8884d8"
    }

    // axis definitions for line chart
    let line_axis = {
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

    // column definitions for assignments data grid
    const colDefAssignments: GridColDef[] = [
        { field: 'id', headerName: 'Name', minWidth: 150, flex: 1, renderCell: (params: any) => <Link onClick={handleClickAssignment(dummyQueries.getAssignment(params.value))}>{dummyQueries.getAssignment(params.value).name}</Link> },
        { field: 'averageGrade', headerName: 'Average Grade', type: 'number', minWidth: 150, flex: 1 },
        { field: 'numberOfSubmissions', headerName: 'Submissions', type: 'number', minWidth: 150, flex: 1 },
        { field: 'dueDate', headerName: 'Date Due', type: 'date', minWidth: 150, flex: 1 },

    ];

    // column definitions for students data grid
    const colDefStudents: GridColDef[] = [
        { field: 'id', headerName: 'Name', flex: 1, renderCell: (params: any) => dummyQueries.getUser(params.value).firstName + ' ' + dummyQueries.getUser(params.value).lastName },
        { field: 'email', headerName: 'Email', type: 'string', minWidth: 150, flex: 1 },
        { field: 'grade', headerName: 'Grade', type: 'number', minWidth: 150, flex: 1 },
    ];


    // front end material
    return (
        <div>
            <Layout role={user.role}>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} >
                            <InfoCard title='Average Grade' value={`${dummyQueries.getAverageCourseGrade(course_id)}%`}></InfoCard>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <InfoCard title='Students' value={dummyQueries.getCourse(course_id).students.length.toString()}></InfoCard>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <BarChartCard title='Grade Distribution' data={gradeDistribution} axis={bar_axis} bar={bar}></BarChartCard>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LineChartCard title='Grade Trend' data={averageGradeTrend} axis={line_axis}></LineChartCard>
                        </Grid>
                        <Grid item xs={12}>
                            <DataGridCard title={'Assignments'} rows={assignmentData} columns={colDefAssignments} pagination={true} />
                        </Grid>
                        <Grid item xs={12}>
                            <DataGridCard title={'Students'} rows={studentData} columns={colDefStudents} pagination={true} />
                        </Grid>
                    </Grid>
                </Container>
            </Layout>
        </div>
    )
}


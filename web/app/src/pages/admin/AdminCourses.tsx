import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { GridColDef } from '@mui/x-data-grid'
import InfoCard from '../../components/infocard/InfoCard'
import DataGridCard from '../../components/datagridcard/DataGridCard'
import PieChartCard from '../../components/piechartcard/PieChartCard'
import LineChartCard from '../../components/linechartcard/LineChartCard'
import dummyQueries from '../../data/dummy/DummyQueries'
import colors from '../../style/Colors'

/* Courses Page pertaining to an Admin User Role */
export default function AdminCourses() {

    // pull necessary data that will be used to display the page
    const numCourses = dummyQueries.getAllCourses().length;
    const numActiveCourses = dummyQueries.getAllActiveCourses().length;
    const numCompletedCourses = dummyQueries.getAllCompletedCourses().length;
    const coursesStatusData = dummyQueries.getCoursesStatusData();
    const coursesData = dummyQueries.getCoursesData();
    const courseTrend = dummyQueries.getCourseTrend(); // this is the one that is causing the bug
    

    // Define Each Column
    const col: GridColDef[] = [
        { field: 'id', headerName: 'Name', minWidth: 150, flex: 1, renderCell: (params: any) => { return dummyQueries.getCourse(params.id as number).name } },
        {
            field: 'instructor_id', headerName: 'Instructor Name', minWidth: 150, flex: 1, renderCell: (params: any) => {
                return dummyQueries.getUser(params.formattedValue as number).firstName + ' ' + dummyQueries.getUser(params.formattedValue as number).lastName
            }
        },
        { field: 'course_name', headerName: 'cn', hide: true, sortable: false, filterable: false },
        { field: 'instructor_name', headerName: 'in', hide: true, sortable: false, filterable: false },
        { field: 'numberOfStudents', headerName: '# Students', type: 'number', minWidth: 150, flex: 1 },
        { field: 'status', headerName: 'Status', minWidth: 150, flex: 1 },
        { field: 'startDate', headerName: 'Start Date', type: 'date', minWidth: 150, flex: 1 },
        { field: 'endDate', headerName: 'End Date', type: 'date', minWidth: 150, flex: 1 }
    ]

    // axis definitions
    const axis = {
        xaxis: {
            dataKey: 'date'
        },

        yaxis: [
            {
                dataKey: 'numCourses',
                stroke: '#8884d8'
            },
        ]
    }

    // front end material
    return (
        <div>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={4}>
                        <InfoCard title='Courses' value={numCourses.toString()}></InfoCard>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <InfoCard title='Active Courses' value={numActiveCourses.toString()}></InfoCard>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <InfoCard title='Completed Courses' value={numCompletedCourses.toString()}></InfoCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LineChartCard title={'Active Courses'} data={courseTrend} axis={axis} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PieChartCard title={'Course Progress Breakdown'} data={coursesStatusData} colors={colors} />
                    </Grid>

                    <Grid item xs={12}>
                        <DataGridCard title={'Courses'} rows={coursesData} columns={col} pagination={true} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

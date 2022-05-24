import React from 'react'
import { Container, Grid } from '@material-ui/core'
import InfoCard from '../../components/infocard/InfoCard'
import LineChartCard from '../../components/linechartcard/LineChartCard'
import PieChartCard from '../../components/piechartcard/PieChartCard'
import dummyQueries from '../../data/dummy/DummyQueries'
import colors from '../../style/Colors'


/* Dashboard Page pertaining to an Admin Role */
export default function AdminDashboard() {

    // pull necessary data to display the page
    const numUsers = dummyQueries.getAllUsers().length;
    const numCourses = dummyQueries.getAllCourses().length;
    const numLocations = dummyQueries.getLocationData().length;
    const courseProgress = dummyQueries.getCoursesStatusData();
    const trend = dummyQueries.getUserActivityTrend();

    // axis definitions 
    const axis = {
        xaxis: {
            dataKey: 'date'
        },

        yaxis: [
            {
                dataKey: 'numUsers',
                stroke: '#8884d8'
            },
        ]
    }


    // front end material
    return (
        <div>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={4}>
                        <InfoCard title='Users' value={numUsers.toString()}></InfoCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={4}>
                        <InfoCard title='Courses' value={numCourses.toString()}></InfoCard>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4}>
                        <InfoCard title='Locations' value={numLocations.toString()}></InfoCard>
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <LineChartCard title={'User Activity'} data={trend} axis={axis}></LineChartCard>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <PieChartCard title={'Course Progress Breakdown'} data={courseProgress} colors={colors}></PieChartCard>
                    </Grid>

                </Grid>
            </Container>
        </div>
    )
}

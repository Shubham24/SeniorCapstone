import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { GridColDef } from '@mui/x-data-grid'
import InfoCard from '../../components/infocard/InfoCard'
import LineChartCard from '../../components/linechartcard/LineChartCard'
import DataGridCard from '../../components/datagridcard/DataGridCard'
import PieChartCard from '../../components/piechartcard/PieChartCard'
import dummyQueries from '../../data/dummy/DummyQueries'
import colors from '../../style/Colors'

/* Users Page pertaining to an Admin Role*/
export default function AdminUsers() {

    // pull necessary data to display the page
    const numUsers = dummyQueries.getAllUsers().length;
    const numInstructors = dummyQueries.getAllInstructors().length;
    const numStudents = dummyQueries.getAllStudents().length;
    const userRoleData = dummyQueries.getUserRoleData();
    const userTrend = dummyQueries.getUserActivityTrend();
    const userData = dummyQueries.getUserData();

    
    // axis defintions for the line chart
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
    
    // column definitions for the data grid
    const colDef: GridColDef[] = [
        {field: 'id', headerName: 'Name', minWidth: 150, flex: 1, renderCell: (params) => (dummyQueries.getUser(params.value as number).firstName + ' ' + dummyQueries.getUser(params.value as number).lastName).toString()},
        {field: 'name', headerName: 'n', hide: true, sortable: false, filterable: false},
        {field: 'email', headerName: 'Email', minWidth: 150, flex: 1},
        {field: 'role', headerName: 'Role', minWidth: 150, flex: 1},
        {field: 'lastActive', headerName: 'Last Active', type: 'date', minWidth: 150, flex: 1},
        {field: 'dateRegistered', headerName: 'Date Registered', type: 'date', minWidth: 150, flex: 1},
    ]; 

    // front end material
    return (
        <div>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={4}>
                        <InfoCard title='Users' value={numUsers.toString()}></InfoCard>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <InfoCard title='Instructors' value={numInstructors.toString()}></InfoCard>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <InfoCard title='Students' value={numStudents.toString()}></InfoCard>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <PieChartCard title='Roles Breakdown' data={userRoleData} colors={colors}></PieChartCard>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <LineChartCard title={'Active Users'} data={userTrend} axis={axis}></LineChartCard>
                    </Grid>

                    <Grid item xs={12}>
                        <DataGridCard title={'Users'} rows={userData} columns={colDef} pagination={true} />
                    </Grid>


                </Grid>
            </Container>
        </div>
    )
}

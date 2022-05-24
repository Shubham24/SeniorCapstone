import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { GridColDef } from '@mui/x-data-grid'
import InfoCard from '../../components/infocard/InfoCard'
import DataGridCard from '../../components/datagridcard/DataGridCard'
import PieChartCard from '../../components/piechartcard/PieChartCard'
import LineChartCard from '../../components/linechartcard/LineChartCard'
import dummyQueries from '../../data/dummy/DummyQueries'
import colors from '../../style/Colors'


/* Crashes Page pertaining to an Admin Role */
export default function AdminCrashes() {

    // get necessary data for the page
    const numCrashes = dummyQueries.getAllCrashes().length;
    const numFatalCrashes = dummyQueries.getAllFatalCrashes().length;
    const crashesByPlatform = dummyQueries.getCrashesByPlatformData();
    const crashTrend = dummyQueries.getCrashTrend();
    const crashData = dummyQueries.getCrashData();

    // axis defintions
    const axis = {
        xaxis: {
            dataKey: 'date'
        },

        yaxis: [
            {
                dataKey: 'crashes',
                stroke: '#8884d8'
            },

            {
                dataKey: 'fatal',
                stroke: '#ff6961'
            },
        ]
    }


    // column definitions for data grid
    const colDef: GridColDef[] = [
        { field: 'id', headerName: 'id', hide: true },
        { field: 'name', headerName: 'Name', minWidth: 150, flex: 1 },
        { field: 'platform', headerName: 'Platform', minWidth: 150, flex: 1 },
        { field: 'fatal', headerName: 'Fatal', type: 'boolean', minWidth: 150, flex: 1 },
        { field: 'date', headerName: 'Date', type: 'date', minWidth: 150, flex: 1 },
    ];


    // front end material
    return (
        <div>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} >
                        <InfoCard title='Crashes' value={numCrashes.toString()}></InfoCard>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <InfoCard title='Fatal Crashes' value={numFatalCrashes.toString()}></InfoCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LineChartCard title={'Crash Trend'} data={crashTrend} axis={axis} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PieChartCard title={'Crashes By Platform'} data={crashesByPlatform} colors={colors} />
                    </Grid>

                    <Grid item xs={12}>
                        <DataGridCard title={'Crash Data'} rows={crashData} columns={colDef} pagination={true} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

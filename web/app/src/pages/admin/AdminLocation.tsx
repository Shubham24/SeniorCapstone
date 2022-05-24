import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { GridColDef } from '@mui/x-data-grid'
import InfoCard from '../../components/infocard/InfoCard'
import PieChartCard from '../../components/piechartcard/PieChartCard'
import DataGridCard from '../../components/datagridcard/DataGridCard'
import dummyQueries from '../../data/dummy/DummyQueries'
import colors from '../../style/Colors'


/* Location Page pertaining to an admin role */
export default function AdminLocation() {

    // pull necessary data to display the page
    const locationData = dummyQueries.getLocationData();
    const locationPieChartData: { name: string; value: any }[] = [];

    // data to capture the most popular location
    let maxNumUsersInLocation = 0;
    let mostPopularLocation = '';

    // iterate through data to get the most popular location and find out how many users per location
    locationData.forEach(location => {
        if (location.numUsers > maxNumUsersInLocation) {
            maxNumUsersInLocation = location.numUsers;
            mostPopularLocation = location.city + ', ' + location.state;
        }

        locationPieChartData.push({
            name: location.city + ', ' + location.state,
            value: location.numUsers
        });
    });


    // column definitions for the data grid
    const colDef: GridColDef[] = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'city', headerName: 'City', minWidth: 150, flex: 1 },
        { field: 'state', headerName: 'State', minWidth: 150, flex: 1 },
        { field: 'numUsers', headerName: '# Users', type: 'number', minWidth: 150, flex: 1 },
    ];

    // front end content
    return (
        <div>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <InfoCard title='Locations' value={locationData.length.toString()}></InfoCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoCard title='Most Popular Location' value={mostPopularLocation}></InfoCard>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <PieChartCard title={'Users by Location'} data={locationPieChartData} colors={colors}></PieChartCard>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DataGridCard title='Locations' rows={locationData} columns={colDef} />
                    </Grid>
                </Grid>
            </Container>

        </div>
    )
}

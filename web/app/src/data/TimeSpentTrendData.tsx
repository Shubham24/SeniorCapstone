// JSON Object Containing Active User dummy data
const TimeSpentData = {
    data: [
        {
            name: 'Jan-21',
            hours: 350
        },
        {
            name: 'Feb-21',
            hours: 350
        },
        {
            name: 'Mar-21',
            hours: 350
        },
        {
            name: 'Apr-21',
            hours: 450
        },
        {
            name: 'May-21',
            hours: 470
        },
        {
            name: 'Jun-21',
            hours: 500
        },
        {
            name: 'Jul-21',
            hours: 100
        },
        {
            name: 'Aug-21',
            hours: 100
        },
        {
            name: 'Sep-21',
            hours: 50
        },
        {
            name: 'Oct-21',
            hours: 20
        },
        {
            name: 'Nov-21',
            hours: 30
        },
        {
            name: 'Dec-21',
            hours: 250
        }
    ],

    axis: {
        xaxis: {
            dataKey: 'name'
        },

        yaxis: [
            {
                dataKey: 'hours',
                stroke: '#8884d8'
            }
        ]
    }
}

export default TimeSpentData;
// JSON Object Containing Active User dummy data
const ActiveUserData = {
    data: [
        {
            name: 'Jan-21',
            users: 120
        },
        {
            name: 'Feb-21',
            users: 210
        },
        {
            name: 'Mar-21',
            users: 70
        },
        {
            name: 'Apr-21',
            users: 500
        },
        {
            name: 'May-21',
            users: 480
        },
        {
            name: 'Jun-21',
            users: 480
        },
        {
            name: 'Jul-21',
            users: 200
        },
        {
            name: 'Aug-21',
            users: 180
        },
        {
            name: 'Sep-21',
            users: 160
        },
        {
            name: 'Oct-21',
            users: 240
        },
        {
            name: 'Nov-21',
            users: 389
        },
        {
            name: 'Dec-21',
            users: 400
        }
    ],

    axis: {
        xaxis: {
            dataKey: 'name'
        },

        yaxis: [
            {
                dataKey: 'users',
                stroke: '#8884d8'
            }
        ]
    }
}

export default ActiveUserData;